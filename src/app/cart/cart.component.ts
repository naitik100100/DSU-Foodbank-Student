import { environment } from "@env/environment";
import { Component, OnInit } from "@angular/core";
import { CartService } from "@app/@shared/services/cart.service";
import { ItemModel } from "@app/@shared/model/Item";
import { DataSource } from "@angular/cdk/table";
import { MatTableDataSource } from "@angular/material/table";
import { AuthenticationService } from "@app/@shared/services/authentication.service";
import { OrdersService } from "@app/@shared/services/orders.service";
import { ItemsService } from "@app/@shared/services/items.service";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogWrapperComponent } from "@app/@shared/mat-dialog-wrapper/mat-dialog-wrapper.component";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  loading = false;

  constructor(
    public cartService: CartService,
    public authService: AuthenticationService,
    public orderService: OrdersService,
    public itemService: ItemsService,
    public matDialog: MatDialog
  ) {}

  cartItems: ItemModel[] = [];
  displayedColumns: string[] = ["name", "quantity", "delete"];
  dataSource: MatTableDataSource<ItemModel>;

  ngOnInit(): void {
    this.authService.checkLogin();
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.getItems();
    this.dataSource = new MatTableDataSource<ItemModel>(this.cartItems);
  }

  changeQuantity(change: number, item: ItemModel) {
    if (item.quantity > 1 || change != -1) {
      item.quantity = item.quantity + change;
    }
  }

  delete(item: ItemModel) {
    this.cartService.delete(item);
    this.getCartItems();
  }

  placeOrder() {
    this.loading = true;
    let newOrderId: number;

    // Checking whether enough quantities are available or not ??
    this.orderService.checkItemsQuantity({ items: this.cartItems }).subscribe((res: any) => {
      if (res.success) {
        this.orderService.getLatestOrder().subscribe((res10: any) => {
          if (res10.success === false) {
            this.prepareStateSupplier(newOrderId);
          } else {
            this.orderService.isOrderExist(res10.result.orderid).subscribe((res11: any) => {
              if (res11.orderPlaced === false) {
                this.prepareStateSupplier(newOrderId);
              } else {
                // order already placed
                this.loading = false;
                this.matDialog.open(MatDialogWrapperComponent, {
                  data: {
                    header: `Error - Can't place the order!`,
                    content: `You have already placed an order during the week!`,
                  },
                });
              }
            });
          }
        });
      } else {
        // show message with list of items that are not have enough qunatities
        this.loading = false;
        this.matDialog.open(MatDialogWrapperComponent, {
          data: {
            header: `Error - Can't place the order!`,
            content: `There aren't enough quantities available for the selected cart Items`,
          },
        });
      }
    });
  }

  formateDate(date: Date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  prepareStateSupplier(newOrderId: number) {
    // update supplier modify quantities
    // get new order id
    this.orderService.getNewOrder().subscribe((res1: any) => {
      newOrderId = res1.Count + 1;
      const currentDate = this.formateDate(new Date());
      const pickupDate = new Date();
      pickupDate.setDate(pickupDate.getDate() + 3);
      const formattedPickupDate = this.formateDate(pickupDate);

      const body = {
        id: newOrderId,
        bannerId: localStorage.getItem("bannerId"),
        orderedDate: currentDate,
        pickUpDate: formattedPickupDate,
        deliveredDate: "",
        status: "placed",
        details: this.cartItems,
      };
      // update staff api endpoint for new order
      this.orderService.updateStaff(body).subscribe((res2: any) => {
        if (JSON.stringify(res2) === "{}") {
          // modify item quantities
          this.orderService.updateSupplierQuantities(this.cartItems).subscribe((res3: any) => {
            if (res3.success) {
              this.orderService.placeOrder(newOrderId).subscribe((res4: any) => {
                if (res4.success) {
                  this.matDialog.open(MatDialogWrapperComponent, {
                    data: {
                      header: `Success!`,
                      content: `${res4.message}. Order ID: ${res4.order.id}`,
                    },
                  });
                  this.cartItems = [];
                  this.dataSource.data = this.cartItems;
                  this.loading = false;
                } else {
                  // error updating student order
                  this.orderService.revertStaffOrder(newOrderId).subscribe((res5: any) => {
                    if (JSON.stringify(res5)) {
                      this.orderService.revertQuantities(this.cartItems).subscribe((res6: any) => {
                        if (res6.success) {
                          this.loading = false;
                          this.matDialog.open(MatDialogWrapperComponent, {
                            data: {
                              header: `Error - Can't place the order!`,
                              content: `Transaction rollbacked due to the internal error in Staff API endpoint`,
                            },
                          });
                        } else {
                          this.loading = false;
                          // rollback failed - inconsistent state
                        }
                      });
                    } else {
                      this.loading = false;
                      // rollback failed - inconsistent state
                    }
                  });
                }
              });
            } else {
              // error modifying quantities
              this.orderService.revertStaffOrder(newOrderId).subscribe((res5: any) => {
                if (JSON.stringify(res5)) {
                  this.loading = false;
                  this.matDialog.open(MatDialogWrapperComponent, {
                    data: {
                      header: `Error - Can't place the order!`,
                      content: `Transaction rollbacked due to the internal error in Supplier API endpoint`,
                    },
                  });
                } else {
                  this.loading = false;
                  // rollback failed - inconsistent state
                }
              });
            }
          });
        } else {
          // Error unable to place an order
          // Staff order can't be placed
          this.loading = false;
          this.matDialog.open(MatDialogWrapperComponent, {
            data: {
              header: `Error - Can't place the order!`,
              content: `Unable to add order using staff API endpoint`,
            },
          });
        }
      });
    });
  }
}

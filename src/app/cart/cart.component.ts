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
    console.log("Getting cart Items");
    this.cartItems = this.cartService.getItems();
    console.log(this.cartItems);
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
    let newOrderId: number;

    // Checking whether enough quantities are available or not ??
    this.orderService.checkItemsQuantity({ items: this.cartItems }).subscribe((res: any) => {
      if (res.success) {
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
            orderstatus: "placed",
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
                    } else {
                      // error updating student order
                      // revert staff and supplier ??
                    }
                  });
                } else {
                  // error modifying quantities
                  // revert staff order ??
                }
              });
            } else {
              // Error unable to place an order
              // Staff order can't be placed
              this.matDialog.open(MatDialogWrapperComponent, {
                data: {
                  header: `Error - Can't place the order!`,
                  content: `Unable to add order using staff API endpoint`,
                },
              });
            }
          });
        });
      } else {
        // show message with list of items that are not have enough qunatities
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
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/@shared/services/cart.service';
import { ItemModel } from '@app/@shared/model/Item';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@app/@shared/services/authentication.service';
import { OrdersService } from '@app/@shared/services/orders.service';
import { ItemsService } from '@app/@shared/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '@app/@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public cartService: CartService,
    public authService: AuthenticationService,
    public orderService: OrdersService,
    public itemService: ItemsService,
    public matDialog: MatDialog
  ) { }

  cartItems: ItemModel[] = []
  displayedColumns: string[] = [ 'name', 'quantity','delete'];
  dataSource: MatTableDataSource<ItemModel>;

  ngOnInit(): void {
    this.authService.checkLogin();
    this.getCartItems()
  }

  getCartItems()
  {
    console.log("Getting cart Items");
    this.cartItems = this.cartService.getItems()
    console.log(this.cartItems);
    this.dataSource = new MatTableDataSource<ItemModel>(this.cartItems);
  }

  changeQuantity(change: number, item: ItemModel)
  {
    if(item.quantity>1 || change!=-1)
    {
      item.quantity = item.quantity+change
    }
  }

  delete(item:ItemModel)
  {
    this.cartService.delete(item)
    this.getCartItems()
  }

  placeOrder()
  {
    let count = 0;
    let status = true;
    this.cartItems.forEach((item:ItemModel)=>
    {
      this.itemService.getItem(item.id).subscribe((data:any)=>{
        let i: ItemModel = data.Item;

        if(i.quantity>=item.quantity && status==true)
        {
          count++;
          if(count==this.cartItems.length)
          {
            // this.orderService.placeOrder(this.cartItems).subscribe((data:any)=>{

            // },(error:any)=>{

            // })
            this.matDialog.open(MatDialogWrapperComponent, {data:{
              header: 'Success',
              content: 'Order Placed Successfully'
            }})
          }
        }
        else if(status==true)
        {
          status = false
          this.matDialog.open(MatDialogWrapperComponent, {data:{
            header: 'Error',
            content: `Not Enough Quantity Available for <strong>${item.itemname}</strong>`
          }})
        }
      })
    })
  }

}

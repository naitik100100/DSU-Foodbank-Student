import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/@shared/services/cart.service';
import { ItemModel } from '@app/@shared/model/Item';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@app/@shared/services/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public cartService: CartService,
    public authService: AuthenticationService
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

}

import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/@shared/services/cart.service';
import { ItemModel } from '@app/@shared/model/Item';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public cartService: CartService
  ) { }

  cartItems: ItemModel[] = []
  displayedColumns: string[] = [ 'name', 'quantity'];
  dataSource: MatTableDataSource<ItemModel>;

  ngOnInit(): void {
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
    item.quantity = item.quantity+change
  }

}

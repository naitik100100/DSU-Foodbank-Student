import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '@app/@shared/services/items.service';
import { OrdersService } from '@app/@shared/services/orders.service';
import { Navigation, Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ItemModel } from '@app/@shared/model/Item';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from '@app/@shared/model/Order';
import { AuthenticationService } from '@app/@shared/services/authentication.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  id: number
  order: OrderModel
  error = false

  orderItems: ItemModel[] = []
  displayedColumns: string[] = [ 'name', 'quantity'];
  dataSource: MatTableDataSource<ItemModel>;

  constructor(
    public itemsService: ItemsService,
    public ordersService: OrdersService,
    public authService: AuthenticationService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.checkLogin();
    this.route.params.subscribe(params=>
      {
          this.id = parseInt(params.id)
          if(!this.id)
          {
            console.log('Invalid Order Id')
          }
          else
          {
            this.fetchOrder()
          }
      })
  }

  fetchOrder()
  {
    console.log('Fetching Order Details of: '+this.id)
    this.order = this.ordersService.getOrder(this.id)

    this.fetchOrderItems()
  }

  fetchOrderItems()
  {
    this.order.details.forEach(orderDetail=>{
      console.log('Fetching Item: '+orderDetail.itemId)
      let item=this.itemsService.getItem(orderDetail.itemId)

      if(item)
      {
        this.orderItems.push(item)
      }
    })

    this.initializeDataGrid()
  }

  initializeDataGrid()
  {
    this.dataSource = new MatTableDataSource<ItemModel>(this.orderItems)
  }
  ngOnDestroy() {}

}

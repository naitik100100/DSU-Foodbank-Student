import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '@app/@shared/services/items.service';
import { OrdersService } from '@app/@shared/services/orders.service';
import { OrderModel } from '@app/@shared/model/Order';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/@shared/services/authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderModel[] = []
  dataSource: MatTableDataSource<OrderModel>;
  displayedColumns: string[]= ['id','status','view']

  @ViewChild(MatPaginator,{static:true}) matPaginator: MatPaginator
  @ViewChild(MatSort,{static: true}) matSort: MatSort

  constructor(
    public itemsService: ItemsService,
    public ordersService: OrdersService,
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.authService.checkLogin();
    this.getOrders()
  }

  getOrders()
  {
    // this.orders = this.ordersService.getAllOrders()
    // this.initializeDataGrid()

    this.ordersService.getAllOrders().subscribe((data:any)=>{
      if(data.success)
      {
        data.result.forEach((order:any)=>{
          this.ordersService.getOrder(order.orderid).subscribe((data:any)=>
          {
            this.orders.push(data.Item)
            this.initializeDataGrid()
          })
        })
      }
    })
  }

  initializeDataGrid()
  {
    this.dataSource = new MatTableDataSource<OrderModel>(this.orders)
    this.dataSource.paginator = this.matPaginator
    this.dataSource.sort = this.matSort
  }

  viewOrder(id: number)
  {
    this.router.navigate([`/orders/${id}`])
  }

}

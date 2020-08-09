import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: '', component: OrdersComponent, data: { title: 'Orders' } },
  { path: ':id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrdersRoutingModule {}

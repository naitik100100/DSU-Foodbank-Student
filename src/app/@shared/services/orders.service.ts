import { Injectable } from "@angular/core";
import { OrderModel } from "../model/Order";
import { Orders } from "@app/mock";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { ItemModel } from "../model/Item";

@Injectable({ providedIn: "root" })
export class OrdersService {
  constructor(public httpClient: HttpClient) {}

  getAllOrders(): Observable<any> {
    let bannerId = localStorage.getItem("bannerId");
    return this.httpClient.get(`${this.getStudentUrl()}orders/${bannerId}`);
  }

  getOrder(id: number): Observable<any> {
    return this.httpClient.get(`${this.getStaffUrl()}orders/${id}`);
  }

  getStudentUrl() {
    return environment.studentUrl;
  }
  getStaffUrl() {
    return environment.staffUrl;
  }
  getSupplierUrl() {
    return environment.supplierUrl;
  }

  placeOrder(orderId: number): Observable<any> {
    let body = {
      bannerid: localStorage.getItem("bannerId"),
      orderid: orderId,
    };

    return this.httpClient.post(`${this.getStudentUrl()}orders`, body);
  }

  getNewOrder() {
    return this.httpClient.get(`${this.getStaffUrl()}orders`);
  }

  updateStaff(body: any) {
    return this.httpClient.post(`${this.getStaffUrl()}orders`, body);
  }

  checkItemsQuantity(items: any): Observable<any> {
    return this.httpClient.post(`${this.getSupplierUrl()}checkexist`, items);
  }

  fetchLatestOrder() {
    let bannerId = localStorage.getItem("bannerId");
    return this.httpClient.get(`${this.getStudentUrl()}latestorder/${bannerId}`);
  }

  updateSupplierQuantities(items: ItemModel[]) {
    return this.httpClient.post(`${this.getSupplierUrl()}updatequantity`, {items});
  }

  revertStaffOrder(orderId: number) {
    return this.httpClient.delete(`${this.getStaffUrl()}orders/${orderId}`);
  }

  revertQuantities(items: ItemModel[]) {
    return this.httpClient.post(`${this.getSupplierUrl()}revertupdate`, {items});
  }

  checkOrderIsPlaced() {}
}

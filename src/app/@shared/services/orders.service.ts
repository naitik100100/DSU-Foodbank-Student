import { Injectable } from "@angular/core";
import { OrderModel } from '../model/Order';
import { Orders } from '@app/mock';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ItemModel } from '../model/Item';

@Injectable({providedIn: "root"})
export class OrdersService
{
    constructor(
        public httpClient: HttpClient
    )
    {
           
    }

    getAllOrders():Observable<any>
    {
        let bannerId = localStorage.getItem('bannerId')
        return this.httpClient.get(`${this.getStudentUrl()}orders/${bannerId}`)
    }

    getOrder(id: number): Observable<any>
    {
        return this.httpClient.get(`${this.getStaffUrl()}orders/${id}`)
    }

    getStudentUrl()
    {
        return environment.studentUrl
    }
    getStaffUrl()
    {
        return environment.staffUrl
    }

    placeOrder(items: ItemModel[]):Observable<any>
    {
        let body = {
            bannerid: localStorage.getItem('bannerId'),
            items: items
        }

        return this.httpClient.post(`${this.getStudentUrl()}orders`,body)
    }
}
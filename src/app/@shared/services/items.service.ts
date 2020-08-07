import { Injectable } from "@angular/core";
import { Items } from '@app/mock';
import { ItemModel } from '../model/Item';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ItemsService
{
    constructor
    (
        public httpClient: HttpClient
    )
    {

    }
    getAllItems(): Observable<any>
    {
        return this.httpClient.get(`${this.getUrl()}items`)
    }

    getItem(id:number)
    {
        return this.httpClient.get(`${this.getUrl()}items/${id}`)
    }

    getUrl()
    {
        return environment.supplierUrl;
    }
}
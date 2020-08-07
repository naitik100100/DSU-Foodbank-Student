import { Injectable } from "@angular/core";
import { Items } from '@app/mock';
import { ItemModel } from '../model/Item';

@Injectable({providedIn: 'root'})
export class ItemsService
{
    getAllItems()
    {
        return Items
    }

    getItem(id:number): ItemModel
    {
        return Items.filter(item=> item.id==id)[0]
    }
}
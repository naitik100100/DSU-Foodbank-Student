import { Injectable } from "@angular/core";
import { ItemsService } from './items.service';
import { ItemModel } from '../model/Item';

@Injectable({providedIn: "root"})

export class CartService
{
    constructor(
        public itemsService: ItemsService
    )
    {

    }

    public itemsInCart: ItemModel[] = [];

    public addItem(item: ItemModel)
    {
        console.log(this.itemsInCart.indexOf(item))
        if(this.itemsInCart.indexOf(item)==-1)
        {
            this.itemsInCart.push(item)
        }
        else
        {
            console.log('already added')
        }
    }
}
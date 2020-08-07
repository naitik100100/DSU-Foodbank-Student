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
        const cartItem: ItemModel = {
            id: item.id,
            name: item.name,
            quantity: 1
        }
        console.log(this.itemsInCart.indexOf(cartItem))
        if(this.itemsInCart.indexOf(cartItem)==-1)
        {
            this.itemsInCart.push(cartItem)
        }
        else
        {
            console.log('already added')
        }
    }

    public getItems()
    {
        return this.itemsInCart;
    }
}
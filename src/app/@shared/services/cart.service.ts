import { Injectable } from "@angular/core";
import { ItemsService } from './items.service';
import { ItemModel } from '../model/Item';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogWrapperComponent } from '../mat-dialog-wrapper/mat-dialog-wrapper.component';

@Injectable({providedIn: "root"})

export class CartService
{
    constructor(
        public itemsService: ItemsService,
        public matDialog: MatDialog
    )
    {

    }

    public itemsInCart: ItemModel[] = [];

    public addItem(item: ItemModel)
    {
        const cartItem: ItemModel = {
            id: item.id,
            itemname: item.itemname,
            quantity: 1
        }
        let addedItem = this.itemsInCart.filter((item)=> item.id==cartItem.id)
        if(addedItem.length==0)
        {
            this.itemsInCart.push(cartItem)

            this.matDialog.open(MatDialogWrapperComponent,{data:{
                header: 'Added',
                content: 'Successfully added to cart'
            }})
        }
        else
        {

            this.matDialog.open(MatDialogWrapperComponent,{data:{
                header: 'Error',
                content: 'Already added'
            }})
        }
    }

    public delete(item:ItemModel)
    {
        let index=0;
        this.itemsInCart.forEach(i=>{
            if(item.id==i.id)
            {
                this.itemsInCart.splice(index,1)
                return; 
            }
            index++;
        })

    }

    public getItems()
    {
        return this.itemsInCart;
    }

}
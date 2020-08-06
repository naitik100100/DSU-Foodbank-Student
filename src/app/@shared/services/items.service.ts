import { Injectable } from "@angular/core";
import { Items } from '@app/mock';

@Injectable({providedIn: 'root'})
export class ItemsService
{
    getAllItems()
    {
        return Items
    }
}
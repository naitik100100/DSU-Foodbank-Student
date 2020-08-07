import { ItemModel } from "./@shared/model/Item";
import { OrderModel } from './@shared/model/Order';

export let Items: ItemModel[] = [
    {
        id: 1,
        itemname: 'Product 1',
        quantity: 10
    },{
        id: 2,
        itemname: 'Product 2',
        quantity: 10
    },{
        id: 3,
        itemname: 'Product 3',
        quantity: 10
    },{
        id: 4,
        itemname: 'Product 4',
        quantity: 10
    },{
        id: 5,
        itemname: 'Product 5',
        quantity: 10
    },{
        id: 6,
        itemname: 'Product 6',
        quantity: 10
    },{
        id: 7,
        itemname: 'Product 7',
        quantity: 10
    },{
        id: 8,
        itemname: 'Product 8',
        quantity: 10
    },{
        id: 9,
        itemname: 'Product 9',
        quantity: 10
    },{
        id: 10,
        itemname: 'Product 10',
        quantity: 10
    },
]

export let Orders: OrderModel[] = [
    {
        id: 1,
        orderedDate: '11-11-2020',
        pickUpDate: '12-11-2020',
        status: 'ready',
        deliveredDate: null,
        details: [
            {
                itemId: 4,
                quantity: 20
            },
            {
                itemId: 3,
                quantity: 20
            },
            {
                itemId: 1,
                quantity: 20
            },
        ]
    },{
        id: 2,
        orderedDate: '1-1-2020',
        pickUpDate: '2-1-2020',
        status: 'placed',
        deliveredDate: null,
        details: [
            {
                itemId: 4,
                quantity: 20
            },
            {
                itemId: 3,
                quantity: 20
            },
            {
                itemId: 1,
                quantity: 20
            },
        ]
    }
]
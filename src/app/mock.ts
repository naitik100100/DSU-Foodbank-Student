import { ItemModel } from "./@shared/model/Item";
import { OrderModel } from './@shared/model/Order';

export let Items: ItemModel[] = [
    {
        id: 1,
        name: 'Product 1',
        quantity: 10
    },{
        id: 2,
        name: 'Product 2',
        quantity: 10
    },{
        id: 3,
        name: 'Product 3',
        quantity: 10
    },{
        id: 4,
        name: 'Product 4',
        quantity: 10
    },{
        id: 5,
        name: 'Product 5',
        quantity: 10
    },{
        id: 6,
        name: 'Product 6',
        quantity: 10
    },{
        id: 7,
        name: 'Product 7',
        quantity: 10
    },{
        id: 8,
        name: 'Product 8',
        quantity: 10
    },{
        id: 9,
        name: 'Product 9',
        quantity: 10
    },{
        id: 10,
        name: 'Product 10',
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
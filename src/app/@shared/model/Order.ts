export interface OrderModel{
    id: number,
    orderedDate: string,
    pickUpDate: string,
    deliveredDate?:string,
    status: string,
    details: OrderDetailModel[]
}

export interface OrderDetailModel
{
    itemId: number,
    quantity: number
}
import { v4 as uuid } from 'uuid';
import { ActiveEnum } from "../Enums/ActiveEnum";
import { OrderEnum } from '../Enums/OrderEnum';

export default class FinancialExposure {
    private Id: string;
    private Created: Date;
    private Modified: Date;
    private ActiveType: ActiveEnum;
    private OrderType: OrderEnum;
    private Quantity: number;
    private Price: number;

    constructor(activeType: ActiveEnum, orderType: OrderEnum, quantity: number, price: number, id?: string, created?: Date, modified?: Date) {
        this.Id = id ?? uuid();
        this.Created = created ?? new Date();
        this.Modified = modified ?? new Date();
        this.ActiveType = activeType;
        this.OrderType = orderType;
        this.Quantity = quantity;
        this.Price = price;
    }

    static fromMongoDB(order: any): FinancialExposure {
        return new FinancialExposure(order.ActiveType, order.OrderType, order.Quantity, order.Price, order.Id, order.Created, order.Modified);
    }

    // Getters
    public getId(): string {
        return this.Id;
    }

    public getCreated(): Date {
        return this.Created;
    }
    
    public getModified(): Date {
        return this.Modified;
    }

    public getActiveType(): ActiveEnum {
        return this.ActiveType;
    }

    public getOrderType(): OrderEnum {
        return this.OrderType;
    }

    public getQuantity(): number {
        return this.Quantity;
    }

    public getPrice(): number {
        return this.Price;
    }

    // Setters
    public setId(id: string): void {
        this.Id = id;
    }

    public setModified(date: Date): void {
        this.Modified = date;
    }
    
    public setCreated(date: Date): void {
        this.Created = date;
    }

    public setActiveType(type: ActiveEnum): void {
        this.ActiveType = type;
    }

    public setOrderType(type: OrderEnum): void {
        this.OrderType = type;
    }

    public setQuantity(quantity: number): void {
        this.Quantity = quantity;
    }

    public setPrice(price: number): void {
        this.Price = price;
    }
}
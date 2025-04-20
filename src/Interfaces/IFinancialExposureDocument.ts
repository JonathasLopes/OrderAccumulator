import { Document } from "mongoose";
import { ActiveEnum } from "../Enums/ActiveEnum";
import { OrderEnum } from "../Enums/OrderEnum";

export interface IFinancialExposureDocument extends Document {
    Id: string;
    Created: Date;
    Modified: Date;
    ActiveType: ActiveEnum;
    OrderType: OrderEnum;
    Quantity: number;
    Price: number;
}
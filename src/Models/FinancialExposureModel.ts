import mongoose, { Schema } from 'mongoose';
import { ActiveEnum } from '../Enums/ActiveEnum';
import { OrderEnum } from '../Enums/OrderEnum';
import { IFinancialExposureDocument } from '../Interfaces/IFinancialExposureDocument';

const FinancialExposureSchema = new Schema<IFinancialExposureDocument>({
    Id: { type: String, required: true },
    Created: { type: Date, required: true },
    Modified: { type: Date, required: true },
    ActiveType: { type: String, enum: Object.values(ActiveEnum), required: true },
    OrderType: { type: String, enum: Object.values(OrderEnum), required: true },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true }
});

const FinancialExposureModel = mongoose.model<IFinancialExposureDocument>('FinancialExposure', FinancialExposureSchema);
export default FinancialExposureModel;
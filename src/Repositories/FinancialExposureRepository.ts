import dbConnect from "../Database/mongoose";
import FinancialExposure from "../Entities/FinancialExposureEntity";
import { ActiveEnum } from "../Enums/ActiveEnum";
import { OrderEnum } from "../Enums/OrderEnum";
import { SortByFilter } from "../Helpers/SortByFilterHelper";
import { IFinancialExposureDocument } from "../Interfaces/IFinancialExposureDocument";
import FinancialExposureModel from "../Models/FinancialExposureModel";
import { OrderFilter } from "../Types/OrderFilterType";

async function CreateFinancialExposure(financialExposure: FinancialExposure) {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.insertOne(financialExposure);

        return resp;
    } catch (err) {
        throw err;
    }
}

async function GetAllFinancialExposuresByActive(active: ActiveEnum) {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.find({ ActiveType: active }).lean<IFinancialExposureDocument[]>();
        const respFiltered = resp.map(FinancialExposure.fromMongoDB);

        return respFiltered;
    } catch (err) {
        throw err;
    }
}

async function GetAllFinancialExposuresByFilter(activeType?: any, orderType?: any, order?: any) {
    try {
        await dbConnect();
        const query: any = {};

        if (activeType) query.ActiveType = activeType as ActiveEnum;
        if (orderType) query.OrderType = orderType as OrderEnum;

        const resp = await FinancialExposureModel.find(query).lean<IFinancialExposureDocument[]>();
        const respFiltered = SortByFilter(order ? order as OrderFilter : "RECENT", resp.map(FinancialExposure.fromMongoDB));

        return respFiltered;
    } catch (err) {
        throw err;
    }
}

async function GetFinancialExposuresByOrderId(id: string) {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.findOne({ Id: id }).lean<IFinancialExposureDocument[]>();
        const respFiltered = FinancialExposure.fromMongoDB(resp);

        return respFiltered;
    } catch (err) {
        throw err;
    }
}

async function GetAllFinancialExposures() {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.find().lean<IFinancialExposureDocument[]>();
        const respFiltered = SortByFilter("RECENT", resp.map(FinancialExposure.fromMongoDB));

        return respFiltered;
    } catch (err) {
        throw err;
    }
}

async function UpdateFinancialExposure(financialExposure: FinancialExposure) {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.updateOne(
            { Id: financialExposure.getId() },
            {
                $set: {
                    Quantity: financialExposure.getQuantity(),
                    Price: financialExposure.getPrice(),
                    Modified: financialExposure.getModified()
                }
            }
        );

        return resp;
    } catch (err) {
        throw err;
    }
}

async function DeleteAllFinancialExposures() {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.deleteMany({});

        return resp;
    } catch (err) {
        throw err;
    }
}

async function DeleteFinancialExposureById(id: string) {
    try {
        await dbConnect();

        const resp = await FinancialExposureModel.deleteOne({ Id: id });

        return resp;
    } catch (err) {
        throw err;
    }
}

export {
    CreateFinancialExposure,
    GetAllFinancialExposuresByActive,
    GetAllFinancialExposuresByFilter,
    GetFinancialExposuresByOrderId,
    GetAllFinancialExposures,
    UpdateFinancialExposure,
    DeleteAllFinancialExposures,
    DeleteFinancialExposureById
}
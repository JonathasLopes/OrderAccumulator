import { Router } from 'express';
import FinancialExposureController from './Controllers/FinancialExposureController';

const endpoints = Router();

endpoints.get("/", (req, res) => { res.send("Server On!") });
endpoints.get("/getAll", FinancialExposureController.GetAllFinancialExposure);
endpoints.get("/getByFilter", FinancialExposureController.GetAllFinancialExposureByFilter);
endpoints.get("/getByOrderId", FinancialExposureController.GetAllFinancialExposureByOrderId);

endpoints.post('/postFinancialExposure', FinancialExposureController.PostFinancialExposure);

endpoints.put("/updateFinancialExposure", FinancialExposureController.UpdateFinancialExposure);

endpoints.delete("/deleteAll", FinancialExposureController.DeleteAllFinancialExposure);
endpoints.delete("/delete", FinancialExposureController.DeleteFinancialExposureById);

export default endpoints;
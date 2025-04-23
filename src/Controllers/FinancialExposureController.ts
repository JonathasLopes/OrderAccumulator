import { Request, Response } from "express";
import VerifyBasicAuth from "../Helpers/VerifyBasicAuthHelper";
import { ValidateActive, ValidateOrder } from "../Helpers/ValidateEnumsHelper";
import { ValidatePrice, ValidateQuantity } from "../Helpers/ValidateNumbersHelper";
import { CreateFinancialExposure, DeleteAllFinancialExposures, DeleteFinancialExposureById, GetAllFinancialExposures, GetAllFinancialExposuresByActive, GetAllFinancialExposuresByFilter, GetFinancialExposuresByOrderId, UpdateFinancialExposure } from "../Repositories/FinancialExposureRepository";
import CalculateFinancialExposure from "../Helpers/CalculateFinancialExposureHelper";
import FinancialExposure from "../Entities/FinancialExposureEntity";
import { CurrencyBRLConvert } from "../Helpers/ConvertCurrencyHelper";
import { ActiveEnum } from "../Enums/ActiveEnum";
import { OrderEnum } from "../Enums/OrderEnum";
import { ValidateString } from "../Helpers/ValidateStringsHelper";

class FinancialExposureController {
    async PostFinancialExposure(request: Request, response: Response): Promise<any> {
        const { ativo, lado, quantidade, preco } = request.body;

        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            const activeValidate = ValidateActive(ativo);
            if (!activeValidate.sucesso) return response.status(400).json(activeValidate);

            const orderValidate = ValidateOrder(lado);
            if (!orderValidate.sucesso) return response.status(400).json(orderValidate);

            const quantityValidate = ValidateQuantity(quantidade);
            if (!quantityValidate.sucesso) return response.status(400).json(quantityValidate);

            const priceValidate = ValidatePrice(preco);
            if (!priceValidate.sucesso) return response.status(400).json(priceValidate);

            const allFinancialExposure = await GetAllFinancialExposuresByActive(ativo);

            const newFinancialExposure = new FinancialExposure(ativo as ActiveEnum, lado as OrderEnum, quantidade, preco);

            const totalResponse = CalculateFinancialExposure({
                allFinancialExposure,
                newFinancialExposure
            });

            if (totalResponse > global.limit) {
                const currentTotal = CalculateFinancialExposure({ allFinancialExposure });

                return response.status(422).json({ sucesso: false, msg_erro: `O total de ${CurrencyBRLConvert(totalResponse)} excede o limite máximo de ${CurrencyBRLConvert(global.limit)}.`, exposicao_atual: currentTotal });
            } else {
                await CreateFinancialExposure(newFinancialExposure);
            }

            return response.json({ sucesso: true, msg_erro: "", exposicao_atual: parseFloat(totalResponse.toFixed(2)) });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível salvar essa ordem, tente novamente mais tarde!", exposicao_atual: 0.0 });
        }
    }

    async GetAllFinancialExposure(request: Request, response: Response): Promise<any> {
        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            const allFinancialExposure = await GetAllFinancialExposures();

            return response.json({ sucesso: true, data: allFinancialExposure });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível obter todas as ordens, tente novamente mais tarde!" });
        }
    }

    async GetAllFinancialExposureByFilter(request: Request, response: Response): Promise<any> {
        const { activeType, orderType, order } = request.query;

        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            const allFinancialExposure = await GetAllFinancialExposuresByFilter(activeType, orderType, order);

            return response.json({ sucesso: true, data: allFinancialExposure });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível obter todas as ordens, tente novamente mais tarde!" });
        }
    }

    async GetFinancialExposureByOrderId(request: Request, response: Response): Promise<any> {
        const { id } = request.query;

        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            var idResponse = ValidateString(id as string);
            if (!idResponse.sucesso) return response.status(400).json(idResponse);

            const financialExposure = await GetFinancialExposuresByOrderId(id as string);

            return response.json({ sucesso: true, data: financialExposure });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível obter todas as ordens, tente novamente mais tarde!" });
        }
    }

    async UpdateFinancialExposure(request: Request, response: Response): Promise<any> {
        const { id, quantidade, preco } = request.body;

        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            var idResponse = ValidateString(id as string);
            if (!idResponse.sucesso) return response.status(400).json(idResponse);

            const quantityValidate = ValidateQuantity(quantidade);
            if (!quantityValidate.sucesso) return response.status(400).json(quantityValidate);

            const priceValidate = ValidatePrice(preco);
            if (!priceValidate.sucesso) return response.status(400).json(priceValidate);

            const financialExposure = await GetFinancialExposuresByOrderId(id as string);

            financialExposure.setModified(new Date());
            financialExposure.setQuantity(quantidade);
            financialExposure.setPrice(preco);

            await UpdateFinancialExposure(financialExposure);

            return response.json({ sucesso: true, data: financialExposure });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível obter todas as ordens, tente novamente mais tarde!" });
        }
    }

    async DeleteAllFinancialExposure(request: Request, response: Response): Promise<any> {
        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            await DeleteAllFinancialExposures();

            return response.json({ sucesso: true });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível deletar todas as ordens, tente novamente mais tarde!" });
        }
    }

    async DeleteFinancialExposureById(request: Request, response: Response): Promise<any> {
        const { id } = request.query;

        try {
            var headerResponse = VerifyBasicAuth(request.headers['authorization']);
            if (!headerResponse.sucesso) return response.status(401).json(headerResponse);

            var idResponse = ValidateString(id as string);
            if (!idResponse.sucesso) return response.status(400).json(idResponse);

            await DeleteFinancialExposureById(id as string);

            return response.json({ sucesso: true });
        }
        catch (error) {
            return response.status(500).json({ sucesso: false, msg_erro: "Não foi possível deletar todas as ordens, tente novamente mais tarde!" });
        }
    }
}

export default new FinancialExposureController()
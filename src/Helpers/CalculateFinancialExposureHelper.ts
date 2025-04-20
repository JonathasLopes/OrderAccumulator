import FinancialExposure from "../Entities/FinancialExposureEntity";
import { OrderEnum } from "../Enums/OrderEnum";

export interface ICalculateFinancialExposure {
    allFinancialExposure: FinancialExposure[],
    newFinancialExposure?: FinancialExposure
}

export default function CalculateFinancialExposure(props: ICalculateFinancialExposure): number {
    const { allFinancialExposure, newFinancialExposure } = props;

    const allSell = allFinancialExposure.filter(item => item.getOrderType() === OrderEnum.V);
    const allBuy = allFinancialExposure.filter(item => item.getOrderType() === OrderEnum.C);
    
    if (newFinancialExposure) {
        if (newFinancialExposure.getOrderType() === OrderEnum.C)
            allBuy.push(newFinancialExposure);
        else
            allSell.push(newFinancialExposure);
    }
    
    const totalBuy = allBuy.reduce((sum, item) => {
        return sum + item.getPrice() * item.getQuantity();
    }, 0);

    const totalSell = allSell.reduce((sum, item) => {
        return sum + item.getPrice() * item.getQuantity();
    }, 0);

    const total = totalBuy - totalSell;

    return total;
}
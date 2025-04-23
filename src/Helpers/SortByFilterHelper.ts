import FinancialExposure from "../Entities/FinancialExposureEntity";
import { OrderFilter } from "../Types/OrderFilterType";

export function SortByFilter(filter: OrderFilter, array: FinancialExposure[]) {
    switch (filter) {
        case "RECENT":
            return array.sort((a, b) => {
                return b.getCreated().getTime() - a.getCreated().getTime();
            });
        case "MAXPRICE":
            return array.sort((a, b) => {
                return b.getPrice() - a.getPrice();
            });
        case "MINPRICE":
            return array.sort((a, b) => {
                return a.getPrice() - b.getPrice();
            });
        case "OLD":
                return array.sort((a, b) => {
                    return a.getCreated().getTime() - b.getCreated().getTime();
                });
    }
}
import { ActiveEnum } from "../Enums/ActiveEnum";
import { OrderEnum } from "../Enums/OrderEnum";
import { IResponse } from "../Interfaces/IResponse";

export function ValidateActive(value?: string): IResponse {
    if(!value || value === "" || !Object.values(ActiveEnum).includes(value.toUpperCase() as ActiveEnum)) {
        return ({ sucesso: false, msg_erro: "Ativo não encontrado ou indefinido", exposicao_atual: 0.0 });
    }

    return ({ sucesso: true });
}

export function ValidateOrder(value?: string): IResponse {
    if(!value || value === "" || !Object.values(OrderEnum).includes(value.toUpperCase() as OrderEnum)) {
        return ({ sucesso: false, msg_erro: "Lado não encontrado ou indefinido", exposicao_atual: 0.0 });
    }

    return ({ sucesso: true });
}
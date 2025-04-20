import { IResponse } from "../Interfaces/IResponse";

export function ValidateQuantity(value?: number): IResponse {
    if(!value || value < 0 || value >= 100000) {
        return ({ sucesso: false, msg_erro: "Quantidade não encontrada ou fora do limite estipulado (entre 0 e 99999).", exposicao_atual: 0.0 });
    }

    return ({ sucesso: true });
}

export function ValidatePrice(value?: number): IResponse {
    if(!value || value < 0.01 || value >= 1000) {
        return ({ sucesso: false, msg_erro: "Preço não encontrada ou fora do limite estipulado (entre 0.01 e 999).", exposicao_atual: 0.0 });
    }

    return ({ sucesso: true });
}
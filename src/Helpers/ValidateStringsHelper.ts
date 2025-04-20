import { IResponse } from "../Interfaces/IResponse";

export function ValidateString(value?: string): IResponse {
    if(!value || value === "") {
        return ({ sucesso: false, msg_erro: "String vazia. Está faltando um parâmetro!", exposicao_atual: 0.0 });
    }

    return ({ sucesso: true });
}
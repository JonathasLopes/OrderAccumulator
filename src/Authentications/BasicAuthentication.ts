import { IResponse } from "../Interfaces/IResponse";

export default function BasicAuthentication(authorization: string[]): IResponse {
    if (authorization[0] !== "Basic") {
        return ({ sucesso: false, msg_erro: "Missing Basic Authorization!", exposicao_atual: 0.0 });
    }

    if (authorization[1] !== process.env.TOKEN) {
        return ({ sucesso: false, msg_erro: "Invalid Authentication Credentials!", exposicao_atual: 0.0 });
    }

    return ({ sucesso: true });
};
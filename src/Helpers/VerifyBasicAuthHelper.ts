import BasicAuthentication from "../Authentications/BasicAuthentication";
import { IResponse } from "../Interfaces/IResponse";

export default function VerifyBasicAuth(basicHeader?: string): IResponse {
    if (!basicHeader) {
        return ({ 
            sucesso: false, 
            msg_erro: "Missing Header Basic Authorization!", 
            exposicao_atual: 0.0
        });
    }

    const basic = basicHeader.split(' ');
    const auth = BasicAuthentication(basic);

    return auth;
}
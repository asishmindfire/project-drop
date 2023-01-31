import { IResponse } from "src/modules/shared/interfaces/response.interface";
import { LoginDto } from "../dto/login.dto";

export interface IAuthService {
    generateToken(payload: LoginDto): IResponse<string>;
}
import { LoginDto } from "../dto/login.dto";

export interface IAuthService {
    generateToken(payload: LoginDto): string;
}
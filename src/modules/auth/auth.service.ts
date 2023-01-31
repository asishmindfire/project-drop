import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IResponse } from "../shared/interfaces/response.interface";
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }


    generateToken(payload: LoginDto): IResponse<string> {
        const data = this.jwtService.sign(payload, { secret: process.env.SECRETKEY });
        return {
            status: true,
            data: data,
            message: "Token generated successfully."
        }
    }
}
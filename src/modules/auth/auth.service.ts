import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ParkResponse } from "../parking/interfaces/parking.model";
import { User } from "../users/entities/user.entity";
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }


    generateToken(payload: LoginDto): ParkResponse {
        const data = this.jwtService.sign(payload, { secret: process.env.SECRETKEY });
        return {
            status: true,
            data: data,
            message: "Token generated successfully."
        }
    }
}
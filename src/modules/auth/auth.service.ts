import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { IAuthService } from "./interface/auth.service.interface";


@Injectable()
export class AuthService implements IAuthService {

    constructor(private readonly jwtService: JwtService) { }


    generateToken(payload: LoginDto): string {
        return this.jwtService.sign(payload, { secret: process.env.SECRETKEY })
    }
}
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from '../shared/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    /**
    * 
    * @url /auth/login
    * @auth false
    * @desc Login route
    * @returns token
    * 
    */
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Body() loginData: LoginDto): IResponse<string> {
        return this.authService.generateToken(loginData);
    }

}

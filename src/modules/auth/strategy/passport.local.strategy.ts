import { Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/modules/users/entities/user.entity";
import { UserService } from "src/modules/users/user.service";


@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super();
    }

    validate(username: string, password: string): User {
        const user: User = this.userService.getUserByName(username);
        if (user == undefined) throw new HttpException("Please provide a valid user.", HttpStatus.BAD_REQUEST);

        if (user.password == password) return user;
        throw new UnauthorizedException();
    }
}
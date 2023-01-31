import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { IUserService } from "./interface/user.service.interface";


@Injectable()
export class UserService implements IUserService {

    public users: User[] = [
        {
            username: "User1",
            password: "admin",
            email: "user1@gmail.com"
        },
        {
            username: "User2",
            password: "admin",
            email: "user2@gmail.com"
        },
        {
            username: "User3",
            password: "admin",
            email: "user3@gmail.com"
        }
    ]


    getUserByName(userName: string): User {
        if (typeof (userName) === 'number') throw new HttpException("Username should be a string type.", HttpStatus.BAD_REQUEST);
        return this.users.find((user) => user.username === userName);
    }
}
import { User } from "../entities/user.entity";

export interface IUserService {
    getUserByName(userName: string): User;
}
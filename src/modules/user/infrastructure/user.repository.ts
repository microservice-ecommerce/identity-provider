import { Injectable } from "@nestjs/common";
import { IUserPort } from "../core";

@Injectable()
export class UserRepository implements IUserPort{
  constructor(){}
  getAll(): string{
    return 'GET ALL USERS'
  }
}

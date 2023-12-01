import { Injectable } from "@nestjs/common";
import { IAuthPort } from "../core";

@Injectable()
export class AuthRepository implements IAuthPort{
  constructor(){}
  getAll(): string{
    return 'GET ALL USERS'
  }
}

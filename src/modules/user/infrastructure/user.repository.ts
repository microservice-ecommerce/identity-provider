import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository{
  constructor(){}
  getAll(): string{
    return 'GET ALL USERS'
  }
}

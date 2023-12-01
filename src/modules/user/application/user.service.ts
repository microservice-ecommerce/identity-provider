import { Inject, Injectable } from "@nestjs/common";
import { IUserUseCase } from '../core/interfaces';
import { IUserPort, USER_REPOSITORY } from "../core";

@Injectable()
export class UserService implements IUserUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort
  ){
  }
  public getAll(){
    return this._userRepository.getAll()
  }
}

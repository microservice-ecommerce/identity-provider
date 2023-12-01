import { Controller, Get, Inject, Param } from "@nestjs/common";
import { UserService } from "../../application/user.service";
import { IUserUseCase } from "../../core/interfaces";
import { USER_SERVICE } from "../../core";


@Controller('users')
export class UserController{
  constructor(
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase){}

  @Get()
  public getAll(){
    return this._userService.getAll()
  }
}

import { Controller, Get, Inject, Param } from "@nestjs/common";
import { UserService } from "../../application/services/user.service";
import { IUserUseCase } from "../../core/interfaces";
import { USER_SERVICE } from "../../core/token";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller('user')
export class UserController{
  constructor(
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase){}

  @Get()
  public getAll(){
    return this._userService.getAll()
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AccountResponse } from "./account.response";
import { InfoUserResponse } from "./info-user.response";
import { AccountEntity, UserEntity } from "@user/core/entities";
export class UserResponse{
  @ApiProperty({
    name: "account",
    description: "account of user",
  })
  account: AccountResponse;


  @ApiProperty({
    name: "user",
    description: "infoUser of user",
  })
  infoUser: InfoUserResponse;

  constructor(user: UserEntity, account: AccountEntity){
    this.account = new AccountResponse(account);
    this.infoUser = new InfoUserResponse(user);
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { AccountRequest } from "./account.request";
import { InfoUserRequest } from "./info-user.request";
export class UserRequest{

  @IsNotEmpty()
  @ApiProperty({
    name: "account",
    description: "account of user",
  })
  @ValidateNested()
  @Type(() => AccountRequest)
  account: AccountRequest;


  @IsNotEmpty()
  @ApiProperty({
    name: "info_user",
    description: "infoUser of user",
  })
  @ValidateNested()
  @Type(() => InfoUserRequest)
  infoUser: InfoUserRequest;
}

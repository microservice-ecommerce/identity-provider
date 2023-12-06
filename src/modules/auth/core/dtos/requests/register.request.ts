import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AccountRequest, UserRequest } from "../../../../user/core/dtos";

export class RegisterRequest{
  @ApiProperty({
    name: "account",
    type: AccountRequest })
  @IsNotEmpty()
  account: AccountRequest;

  @ApiProperty({
    name: "info_user",
    type: UserRequest })
  @IsNotEmpty()
  infoUser: UserRequest;
}

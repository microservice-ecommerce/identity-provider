import { ApiProperty } from "@nestjs/swagger";
import { AccountResponse, UserResponse } from "@user/core/dtos";
import { IsNotEmpty } from "class-validator";

export class RegisterResponse{
  @ApiProperty({
    name: "account",
    type: AccountResponse })
    @IsNotEmpty()
  account: AccountResponse;

  @ApiProperty({
    name: "info_user",
    type: UserResponse })
  @IsNotEmpty()
  infoUser: UserResponse;
}

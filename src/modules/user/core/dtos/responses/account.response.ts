import { ApiProperty } from "@nestjs/swagger";
import { AccountEntity } from "@user/core/entities";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AccountResponse{

  @ApiProperty({
    name: "email",
    description: "Email of user",
    example: "example@example.com",
  })
  email: string;

  constructor(account: AccountEntity){
    this.email = account.email;
  }
}

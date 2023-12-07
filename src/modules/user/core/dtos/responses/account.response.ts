import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AccountResponse{

  @ApiProperty({
    name: "email",
    description: "Email of user",
    example: "example@example.com",
  })
  email: string;
}

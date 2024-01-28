// login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: "email",
    description: "Email of user",
    example: "example@example.com",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    name: "password",
    description: "password",
    example: "123456",
  })
  password: string;


}

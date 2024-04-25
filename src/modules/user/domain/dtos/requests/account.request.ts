import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from '@user/domain/models';
import { Builder } from 'builder-pattern';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AccountRequest {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'Email of user',
    example: 'example@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    name: 'password',
    description: 'password',
    example: '123456',
  })
  password: string;

  public static toModel(request: AccountRequest): AccountModel {
    return Builder(AccountModel)
      .email(request.email)
      .password(request.password)
      .lastLogin(new Date())
      .lastLoginIp('asd')
      .passwordChanged(new Date())
      .build();
  }

}

import { ApiProperty } from '@nestjs/swagger';
import { AccountModel } from '@user/domain/models';

export class AccountResponse {
  @ApiProperty({
    name: 'email',
    description: 'Email of user',
    example: 'example@example.com',
  })
  email: string;

  constructor(account: AccountModel) {
    this.email = account.email;
  }
}

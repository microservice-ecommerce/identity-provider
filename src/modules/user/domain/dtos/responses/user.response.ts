import { ApiProperty } from '@nestjs/swagger';
import { AccountModel, UserModel } from '@user/domain/models';
import { AccountResponse } from './account.response';
import { InfoUserResponse } from './info-user.response';
export class UserResponse {
  @ApiProperty({
    name: 'account',
    description: 'account of user',
  })
  account: AccountResponse;

  @ApiProperty({
    name: 'user',
    description: 'infoUser of user',
  })
  infoUser: InfoUserResponse;

  constructor(user: UserModel, account: AccountModel) {
    this.account = new AccountResponse(account);
    this.infoUser = new InfoUserResponse(user);
  }
}

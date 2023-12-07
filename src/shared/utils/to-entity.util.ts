import { Builder } from 'builder-pattern';
import { AccountRequest, InfoUserRequest, UserRequest } from "@user/core/dtos";
import { AccountEntity, UserEntity, } from "@user/core/entities";

export class ConvertUtil {
  public static toAccountEntity(request: AccountRequest): AccountEntity{
    return Builder(AccountEntity)
    .email(request.email)
    .password(request.password)
    .lastLogin(new Date())
    .lastLoginIp("asd")
    .passwordChanged(new Date())
    .salt("password")
    .build();
  }

  public static toUserEntity(request: InfoUserRequest, account: AccountEntity): UserEntity{
    return Builder(UserEntity)
    .account(account)
    .address(request.address)
    .dateOfBirth(request.dateOfBirth)
    .gender(request.gender)
    .name(request.name)
    .phoneNumber(request.phoneNumber)
    .build();
  }
}

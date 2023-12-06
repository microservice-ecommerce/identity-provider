import { LoginRequest } from "src/modules/auth/core";
import { AccountEntity, UserEntity } from "src/modules/user/core/entities";
import {Builder} from 'builder-pattern';
import { AccountRequest, UserRequest } from "src/modules/user/core/dtos";

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


}

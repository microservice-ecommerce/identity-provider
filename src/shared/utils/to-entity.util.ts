import { LoginRequest } from "src/modules/auth/core";
import { AccountEntity } from "src/modules/user/core/entities";
import {Builder} from 'builder-pattern';

export class ConvertUtil {
  public static toAccountEntity(request: LoginRequest): AccountEntity{
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

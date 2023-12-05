import { AccountEntity,LoginRequest } from "../../core";
import {Builder} from 'builder-pattern';

export default class AuthUtil{
  public static toEntityAuth(request: LoginRequest): AccountEntity{
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

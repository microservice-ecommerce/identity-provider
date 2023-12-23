import { IdentityProviderConfig } from '../../../infrastructure/configuration/identity-provider.config';

export class CacheExpired {
  static readonly REFRESH_TOKEN: number = IdentityProviderConfig.REFRESH_TOKEN_EXPIRED * 60;
  static readonly FORGOT_PASSWORD: number = 60 * 60 * 24;
  static readonly OTP: number = 60 * 5;
  static readonly OTP_REGISTER: number = 60 * 60 * 24;
  static readonly OTP_FORGOT_PASSWORD: number = 60 * 60 * 24;
}

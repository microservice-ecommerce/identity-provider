import { IdentityProviderConfig } from '../../../infrastructure/configuration/identity-provider.config';

export class IdentityProviderConstant {
  public static readonly ACCESS_TOKEN_EXPIRED: number = IdentityProviderConfig.ACCESS_TOKEN_EXPIRED * 60 * 60; // ** hours

  public static readonly REFRESH_TOKEN_EXPIRED: number = IdentityProviderConfig.REFRESH_TOKEN_EXPIRED * 60 * 60; // ** hours
}

import { IdentityProviderConfig } from "../../../infrastructure/configuration/identity-provider.config";

export class IdentityProviderConstants {
  public static readonly ACCESS_TOKEN_EXPIRED: number =
  IdentityProviderConfig.ACCESS_TOKEN_EXPIRED  * 60 * 60;

  public static readonly ISSUER = 'http://high3ar.club/'
}

import { AuthConfig } from '@auth/infrastructure';

export class AuthConstant {
  public static readonly endpointRefreshToken: string = `/api/${AuthConfig.prefix}/${AuthConfig.refreshToken.url}`;
}

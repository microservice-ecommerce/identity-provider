import { AuthConfig } from '@auth/infrastructure';

export class AuthConstant {
  public static readonly endpointAuth: string = `/api/${AuthConfig.prefix}/`;
}

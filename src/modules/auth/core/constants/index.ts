import { AuthSwagger } from '@auth/infrastructure';

export class AuthConstant {
  public static readonly endpointAuth: string = `/api/${AuthSwagger.prefix}/`;
}

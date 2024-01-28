import { AuthSwagger } from "@auth/presentation";

export class AuthConstant {
  public static readonly endpointAuth: string = `/api/${AuthSwagger.prefix}/`;
}

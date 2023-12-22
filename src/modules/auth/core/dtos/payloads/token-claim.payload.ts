export class BaseTokenPayload{
  sub: string; // Subject
  jti: string; // JWT ID
  iat: number; // Issued At
  aud: string; // Audience
  exp: number; // Expiration Time
  nbf: number; // Not Before Time
  iss: string; // Issuer

  // constructor(
  //   sub: string,
  //   jti: string,
  //   iat: number,
  //   aud: string,
  //   exp: number,
  //   nbf: number,
  //   iss: string,
  // ){
  //   this.sub = sub;
  //   this.jti = jti;
  //   this.iat = iat;
  //   this.aud = aud;
  //   this.exp = exp;
  //   this.nbf = nbf;
  //   this.iss = iss;
  // }
}

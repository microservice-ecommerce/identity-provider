export class BaseTokenClaimPayload {
  sub: string; // Subject
  jti: string; // JWT ID
  iat: number; // Issued At
  aud: string; // Audience
  exp: number; // Expiration Time
  nbf: number; // Not Before Time
  iss: string; // Issuer
  email: string;
  name: string;
  gender: string;
  address: string;
}

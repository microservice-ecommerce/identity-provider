import { BaseTokenClaimsPayload } from '@auth/core/dtos/payloads/token-claim.payload';
import { AES256Helper } from '@high3ar/common-api';
import { IdentityProviderConstants } from "@shared/core/constants";
import { UserPayload } from "@user/core/dtos";
import { uuid } from 'uuidv4';


export class AuthHelper{

  public async createToken(
    user: UserPayload
  ): Promise<BaseTokenClaimsPayload> {
    const now = Math.floor(new Date().getTime() / 1000)
    const payload = {
      sub: AES256Helper.encodeAES256(user.account.email), // Token holders
      jti: uuid(), // Unique identifier for the token.
      iat: now, // Issued at time.
      aud: 'ad',  // Object main token objective.
      exp: now + IdentityProviderConstants.ACCESS_TOKEN_EXPIRED, // Expiration time.
      nbf: now, // Not before time.
      iss: IdentityProviderConstants.ISSUER, // Issuer.
    }

  }

}

import { TokenResponse } from "@auth/core/dtos"
import { UserPayload } from "@user/core/dtos"
import { TokenPayload } from "@auth/core/dtos/payload"
import { AES256Helper } from '@high3ar/common-api';
import { uuid } from 'uuidv4';
import


export class AuthHelper{

  public async createToken(
    user: UserPayload
  ): Promise<TokenPayload> {
    const now = Math.floor(new Date().getTime() / 1000)
    const payload = {
      sub: AES256Helper.encodeAES256(user.account.email), // Token holders
      jti: uuid(), // Unique identifier for the token.
      iat: now, // Issued at time.
      aud: 'ad',  // Object main token objective.
      exp: now + AuthConstants.JWTOKEN_EXPIRED, // Expiration time.
      nbf: now, // Not before time.
      iss: 'ad', // Issuer.
    }

  }

}

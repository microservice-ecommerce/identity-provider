import { AES256Helper } from '@high3ar/common-api';
import { nowTimeNumber } from '@shared/utils/now-time-number';
import { uuid } from 'uuidv4';
import { BaseTokenClaimPayload } from './token-claim.payload';

export class DecodeTokenPayload extends BaseTokenClaimPayload {
  constructor(token: BaseTokenClaimPayload) {
    super();
    
    this.sub = AES256Helper.decodeAES256(token.sub);
    this.jti = token.jti;
    this.iat = token.iat;
    this.aud = AES256Helper.decodeAES256(token.aud);
    this.nbf = token.nbf;
    this.iss = AES256Helper.decodeAES256(token.iss);
    this.name = AES256Helper.decodeAES256(token.name);
    this.address = AES256Helper.decodeAES256(token.address);
    this.gender = AES256Helper.decodeAES256(token.gender);
  }
}

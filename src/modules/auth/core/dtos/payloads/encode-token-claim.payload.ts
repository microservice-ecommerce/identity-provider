import { AES256Helper } from '@high3ar/common-api';
import { nowTimeNumber } from '@shared/utils/now-time-number';
import { uuid } from 'uuidv4';
import { BaseTokenClaimPayload } from './token-claim.payload';

export class EncodeTokenPayload extends BaseTokenClaimPayload {
  constructor(sub: string, aud: string, iss: string) {
    super();
    this.sub = AES256Helper.encodeAES256(sub);
    this.jti = uuid();
    this.iat = nowTimeNumber();
    this.aud = AES256Helper.encodeAES256(aud);
    this.nbf = nowTimeNumber();
    this.iss = AES256Helper.encodeAES256(iss);
  }
}

import { AES256Helper } from '@high3ar/common-api';
import { nowTimeNumber } from '@shared/application/utils/now-time-number';
import { uuid } from 'uuidv4';
import { BaseTokenClaimPayload } from './token-claim.payload';

export class EncodeTokenPayload extends BaseTokenClaimPayload {
  constructor(
    sub: string,
    aud: string,
    iss: string,
    nbf: number,
    now: number,
    expired: number,
    email: string,
    name: string,
    address: string,
    gender: string,
  ) {
    super();
    this.sub = AES256Helper.encodeAES256(sub);
    this.jti = uuid();
    this.iat = now;
    this.aud = AES256Helper.encodeAES256(aud);
    this.nbf = nbf;
    this.exp = expired;
    this.iss = AES256Helper.encodeAES256(iss);
    this.name = AES256Helper.encodeAES256(name);
    this.email = AES256Helper.encodeAES256(email);
    this.address = AES256Helper.encodeAES256(address);
    this.gender = AES256Helper.encodeAES256(gender);
  }
}

import { uuid } from "uuidv4";
import { BaseTokenPayload } from "./token-claim.payload";
import { AES256Helper } from '@high3ar/common-api';

export class EncodeTokenPayload extends BaseTokenPayload{
  constructor(
    sub: string,
    aud: string,
    exp: number,
    nbf: number,
    iss: string
    ){
    super();
    this.sub = AES256Helper.encodeAES256(sub);
    this.jti = uuid();
    this.iat = ;
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class TokenPayload {
  accessToken: string;

  refreshToken: string;

  expiresInAccessToken: number;

  expiresInRefreshToken: number;

  constructor(accessToken: string, refreshToken: string, expiresInAccessToken: number, expiresInRefreshToken: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresInAccessToken = expiresInAccessToken;
    this.expiresInRefreshToken = expiresInRefreshToken;
  }
}

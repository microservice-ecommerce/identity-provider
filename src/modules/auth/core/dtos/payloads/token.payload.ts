import { ApiProperty } from '@nestjs/swagger';

export class TokenPayload {
  @ApiProperty({
    name: 'access_token',
    description: 'access_token request resource',
  })
  accessToken: string;

  @ApiProperty({
    name: 'refresh_token',
    description: 'refresh_token request get access_token',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'expires in access_token',
  })
  expiresIn: number;

  constructor(accessToken: string, refreshToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}

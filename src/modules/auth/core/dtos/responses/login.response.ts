import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse{
  @ApiProperty({
    name: "access_token",
    description: "access_token request resource",
  })
  accessToken: string;

  @ApiProperty({
    name: "refresh_token",
    description: "refresh_token request get access_token",
  })
  refreshToken: string;


  @ApiProperty({
    description: "expired access_token",
  })
  expired: Date;
}

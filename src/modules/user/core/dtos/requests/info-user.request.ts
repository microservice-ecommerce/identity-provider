import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class InfoUserRequest{

  @IsNotEmpty()
  @ApiProperty({
    name : "name",
    description: "name of user",
    example: "Ngoc Phu",
  })
  name: string;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  @ApiProperty({
    name: "phone_number",
    description: "phone_number of user",
    example: "1234567890",
  })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    name: "date_of_birth",
    description: "date of birth of user",
    example: "2023-11-12T08:00:23.719000",
  })
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    name: "gender",
    description: "gender of user",
    example: "true ",
  })
  gender: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: "address",
    description: "address of user",
    example: "Ha Noi",
  })
  address: string;
}

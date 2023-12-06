import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class UserRequest{

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name : "name",
    description: "name of user",
    example: "Ngoc Phu",
  })
  name: string;

  @Min(10)
  @IsNotEmpty()
  @ApiProperty({
    name: "phone_number",
    description: "phone_number of user",
    example: "000000000000",
  })
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    name: "date_of_birth",
    description: "date of birth of user",
    example: "1999-01-01",
  })
  @IsDate()
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

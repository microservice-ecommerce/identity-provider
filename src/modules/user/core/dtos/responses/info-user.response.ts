import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "@user/core/entities";

export class UserResponse{

  @ApiProperty({
    name : "name",
    description: "name of user",
    example: "Ngoc Phu",
  })
  name: string;

  @ApiProperty({
    name: "phone_number",
    description: "phone_number of user",
    example: "000000000000",
  })
  phoneNumber: string;

  @ApiProperty({
    name: "date_of_birth",
    description: "date of birth of user",
    example: "1999-01-01",
  })
  dateOfBirth: Date;

  @ApiProperty({
    name: "gender",
    description: "gender of user",
    example: "true ",
  })
  gender: boolean;

  @ApiProperty({
    name: "address",
    description: "address of user",
    example: "Ha Noi",
  })
  address: string;

  constructor(entity: UserEntity){
    this.name = entity.name;
    this.phoneNumber = entity.phoneNumber;
    this.dateOfBirth = entity.dateOfBirth;
    this.gender = entity.gender;
    this.address = entity.address;
  }
}

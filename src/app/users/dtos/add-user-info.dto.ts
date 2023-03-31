import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddUserInfoDto {

  @ApiProperty({
    description: "User first name"
  })
  @IsString({message: "must be a string"})
  firstName!: string;

  @ApiProperty({
    description: "User last name"
  })
  @IsString({message: "must be a string"})
  lastName!: string;

  @ApiProperty({
    description: "User phone"
  })
  @IsString({message: "must be a string"})
  phone: string;

  @ApiProperty({
    description: "User address"
  })
  @IsString({message: "must be a string"})
  address: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AddUserInfoDto {
  @ApiProperty({
    description: "User email"
  })
  @IsString({message: "must be a string"})
  @IsEmail({}, {message: "got incorrect email"})
  readonly email: string;

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
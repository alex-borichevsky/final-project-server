import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AddUserInfoDto {
  @ApiProperty()
  @IsString({message: "must be a string"})
  @IsEmail({}, {message: "got incorrect email"})
  readonly email: string;

  @ApiProperty()
  @IsString({message: "must be a string"})
  firstName!: string;

  @ApiProperty()
  @IsString({message: "must be a string"})
  lastName!: string;

  @ApiProperty()
  @IsString({message: "must be a string"})
  phone: string;

  @ApiProperty()
  @IsString({message: "must be a string"})
  address: string;
}
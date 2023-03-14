import { IsEmail, IsString } from "class-validator";

export class AddUserInfoDto {
  @IsString({message: "must be a string"})
  @IsEmail({}, {message: "got incorrect email"})
  readonly email: string;

  @IsString({message: "must be a string"})
  firstName!: string;

  @IsString({message: "must be a string"})
  lastName!: string;

  @IsString({message: "must be a string"})
  phone: string;

  @IsString({message: "must be a string"})
  address: string;
}
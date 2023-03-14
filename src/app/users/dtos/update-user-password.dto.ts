 import { IsEmail, IsString, Length, validate } from "class-validator";

export class UpdateUserPasswordDto {
  @IsString({message: "must be a string"})
  @IsEmail({}, {message: "got incorrect email"})
  readonly email: string;

  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  readonly password: string;

  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  readonly newPassword: string;

  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  readonly newPasswordConfirm: string;
}
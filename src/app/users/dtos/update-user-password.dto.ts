 import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, validate } from "class-validator";

export class UpdateUserPasswordDto {
  @ApiProperty({
    description: "User email"
  })
  @IsString({message: "must be a string"})
  @IsEmail({}, {message: "got incorrect email"})
  readonly email: string;

  @ApiProperty({
    description: "User old password"
  })
  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  readonly password: string;

  @ApiProperty({
    description: "User new password"
  })
  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  readonly newPassword: string;

  @ApiProperty({
    description: "New password confirm"
  })
  @IsString({message: "must be a string"})
  @Length(4, 16, {message: "range: 4-16 symbols"})
  readonly newPasswordConfirm: string;
}
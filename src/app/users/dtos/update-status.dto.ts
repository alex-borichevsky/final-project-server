import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString, Length, validate } from "class-validator";

export class UpdateUserStatusDto {

  @ApiProperty({
    description: "User status"
  })
  @IsBoolean({message: "must be a string"})
  readonly status: boolean;

}
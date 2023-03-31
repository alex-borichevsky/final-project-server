import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateUserStatusDto {

  @ApiProperty({
    description: "User status"
  })
  @IsBoolean({message: "must be a string"})
  readonly status: boolean;

}
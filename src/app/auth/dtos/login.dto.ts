import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "User email"
  })
  readonly email: string;

  @ApiProperty({
    description: "User password"
  })
  readonly password: string;
}




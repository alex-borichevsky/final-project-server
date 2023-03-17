import { ApiProperty } from "@nestjs/swagger";

export class RegistrationDto {
  @ApiProperty({
    description: "User email"
  })
  readonly email: string;

  @ApiProperty({
    description: "User password"
  })
  readonly password: string;

  @ApiProperty({
    description: "Confirm password"
  })
  readonly confirmPassword: string;

}


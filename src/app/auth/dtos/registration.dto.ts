import { ApiProperty } from "@nestjs/swagger";

export class RegistrationDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly confirmPassword: string;

}


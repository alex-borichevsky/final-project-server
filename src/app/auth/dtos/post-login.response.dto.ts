import { ApiProperty } from "@nestjs/swagger";

export class PostLoginResponse {
    @ApiProperty()
    readonly accessToken: string;
  }
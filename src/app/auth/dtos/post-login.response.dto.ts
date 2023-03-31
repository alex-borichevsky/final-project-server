import { ApiProperty } from "@nestjs/swagger";

export class PostLoginResponse {
    @ApiProperty()
    readonly access_token: string;

    @ApiProperty()
    readonly expired_at: string;
  }
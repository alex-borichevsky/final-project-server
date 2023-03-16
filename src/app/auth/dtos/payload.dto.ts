import { ApiProperty } from "@nestjs/swagger";

export class Payload {
    @ApiProperty()
    email: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    iat: Date;

    @ApiProperty()
    exp: Date;
}
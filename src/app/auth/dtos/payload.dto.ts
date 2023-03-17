import { ApiProperty } from "@nestjs/swagger";

export class Payload {
    @ApiProperty({
        description: "User email"
      })
    email!: string;

    @ApiProperty({
        description: "User id"
      })
    id!: string;

    @ApiProperty({
        description: "Creation date"
      })
    iat!: Date;

    @ApiProperty({
        description: "Expiration date"
      })
    exp!: Date;
}
import { ApiProperty } from "@nestjs/swagger";

export abstract class UUIDDto {
  @ApiProperty({
    description: "Id"
  })
  id!: string;

  @ApiProperty({
    description: "Created time"
  })
  created!: number;

  @ApiProperty({
    description: "Updated time"
  })
  updated!: number;
}
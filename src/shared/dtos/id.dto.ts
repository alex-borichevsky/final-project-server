import { ApiProperty } from "@nestjs/swagger";

export abstract class UUIDDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  created!: number;

  @ApiProperty()
  updated!: number;
}
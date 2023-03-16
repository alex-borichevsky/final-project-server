import { ApiProperty } from "@nestjs/swagger";

export abstract class UUIDDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  created!: number;

  @ApiProperty()
  updated!: number;
}
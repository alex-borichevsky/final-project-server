import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuantityDto {
  @ApiProperty()
  recordId: string;

  @ApiProperty()
  quantity: number;
}
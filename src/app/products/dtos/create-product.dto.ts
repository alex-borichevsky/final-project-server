import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly price: number;
  
  @ApiProperty()
  readonly description?: string;
  
  @ApiProperty()
  readonly quantity?: number;
  
  @ApiProperty()
  readonly brand?: string;
  
  @ApiProperty()
  readonly categoryName?: string;
}
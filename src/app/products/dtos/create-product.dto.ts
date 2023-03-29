import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    description: "Product name"
  })
  readonly name: string;
  
  @ApiProperty({
    description: "Product price"
  })
  readonly price: number;
  
  @ApiProperty({
    description: "Product description",
    required: false
  })
  readonly description?: string;
  
  @ApiProperty({
    description: "Product quantity",
    required: false
  })
  readonly quantity?: number;
  
  @ApiProperty({
    description: "Product brand",
    required: false
  })
  readonly brand?: string;
  
  @ApiProperty({
    description: "Product category",
    required: true
  })
  readonly categoryId!: number;
}
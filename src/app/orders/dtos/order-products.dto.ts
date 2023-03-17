import { ApiProperty } from "@nestjs/swagger";

export class ProductOrderDto {
  @ApiProperty({
    description: "Product name"
  })
  readonly name: string;
  
  @ApiProperty({
    description: "Product image"
  })
  readonly image: string;
  
  @ApiProperty({
    description: "Product brand"
  })
  readonly brand: string;
  
  @ApiProperty({
    description: "Product price"
  })
  readonly price: number;
  
  @ApiProperty({
    description: "Product quantity"
  })
  readonly quantity: number;
}
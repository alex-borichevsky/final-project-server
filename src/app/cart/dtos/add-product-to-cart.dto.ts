import { ApiProperty } from "@nestjs/swagger";

export class AddProductToCartDto {

  @ApiProperty({
    description: "Product id"
  })
  productId : string;

  @ApiProperty({
    description: "Product quantity"
  })
  quantity: number;
}
import { ApiProperty } from "@nestjs/swagger";

export class AddProductToCartDto {
  @ApiProperty({
    description: "User id"
  })
  userId : string;

  @ApiProperty({
    description: "Product id"
  })
  productId : string;

  @ApiProperty({
    description: "Product quantity"
  })
  quantity: number;
}
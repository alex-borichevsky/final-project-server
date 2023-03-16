import { ApiProperty } from "@nestjs/swagger";

export class AddProductToCartDto {
  @ApiProperty()
  userId : string;

  @ApiProperty()
  productId : string;

  @ApiProperty()
  quantity: number;
}
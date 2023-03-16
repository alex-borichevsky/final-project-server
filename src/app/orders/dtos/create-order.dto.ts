import { ApiProperty } from '@nestjs/swagger';
import { ProductOrderDto } from './order-products.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: "Products"
  })
  readonly products: ProductOrderDto[];

  @ApiProperty({
    description: "User id"
  })
  readonly userId: string;

  @ApiProperty({
    description: "Total price"
  })
  readonly totalPrice: number;
}
import { ApiProperty } from '@nestjs/swagger';
import { ProductOrderDto } from './order-products.dto';

export class CreateOrderDto {

  @ApiProperty({
    description: "Total price"
  })
  readonly totalPrice: number;
}
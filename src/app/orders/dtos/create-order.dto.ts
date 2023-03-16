import { ApiProperty } from '@nestjs/swagger';
import { ProductOrderDto } from './order-products.dto';

export class CreateOrderDto {
  @ApiProperty()
  readonly products: ProductOrderDto[];

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly totalPrice: number;
}
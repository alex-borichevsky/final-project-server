import { ProductOrderDto } from './order-products.dto';

export class CreateOrderDto {

  readonly products: ProductOrderDto[];

  readonly userId: string;

  readonly totalPrice: number;
}
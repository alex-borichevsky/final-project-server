import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

  @ApiProperty({
    description: "Total price"
  })
  readonly totalPrice: number;
}
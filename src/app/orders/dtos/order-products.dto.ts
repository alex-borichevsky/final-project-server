import { ApiProperty } from "@nestjs/swagger";

export class ProductOrderDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly image: string;
  
  @ApiProperty()
  readonly brand: string;
  
  @ApiProperty()
  readonly price: number;
  
  @ApiProperty()
  readonly quantity: number;
}
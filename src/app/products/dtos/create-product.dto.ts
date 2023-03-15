import { CategoryEntity } from '../../categories/entities/category.entity';

export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly quantity: number;
  readonly category?: CategoryEntity;
}
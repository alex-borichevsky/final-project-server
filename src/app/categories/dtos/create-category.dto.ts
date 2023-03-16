import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name"
  })
  readonly name: string;
  
  @ApiProperty({
    description: "Category description"
  })
  readonly description: string;
}
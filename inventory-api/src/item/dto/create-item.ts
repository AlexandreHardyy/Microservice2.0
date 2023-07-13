import { IsInt, Length, Min } from 'class-validator';

export class CreateItemDto {
  @Length(4, 64)
  name: string;
  @Length(2, 300)
  description: string;
  price: number;
  quantity: number;
}

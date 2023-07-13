import { IsInt, Length, Min } from 'class-validator';

export class UpdateItemDto {
  @Length(4, 64)
  name: string;
  @Length(2, 300)
  description: string;
  @IsInt()
  @Min(1)
  price: number;
}

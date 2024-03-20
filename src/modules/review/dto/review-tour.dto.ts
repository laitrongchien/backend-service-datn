import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewTourDto {
  @IsNotEmpty()
  @IsString()
  tour: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}

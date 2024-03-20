import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewMotorbikeDto {
  @IsNotEmpty()
  @IsString()
  motorbike: string;

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

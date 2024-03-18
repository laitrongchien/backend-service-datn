import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class TourDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  imageCover: string;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  startLocation: string;

  @IsNotEmpty()
  startDates: Date[];

  @IsNotEmpty()
  @IsArray()
  itinerary: ItineraryDto[];
}

class ItineraryDto {
  @IsNumber()
  day: number;

  @IsString()
  route: string;

  @IsString()
  distance: number;

  @IsString()
  description: string;
}

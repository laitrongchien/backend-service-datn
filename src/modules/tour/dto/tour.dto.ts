import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TourDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

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

  @IsOptional()
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

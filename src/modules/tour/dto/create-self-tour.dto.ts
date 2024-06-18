import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class LocationDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  coordinates: number[];
}

export class CreateSelfTourDto {
  @IsNotEmpty()
  startLocation: LocationDto;

  @IsOptional()
  stopLocations: LocationDto[];

  @IsNotEmpty()
  endLocation: LocationDto;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  numberPeople: number;

  @IsOptional()
  @IsString()
  description: string;
}

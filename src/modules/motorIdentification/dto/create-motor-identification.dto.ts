import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMotorIdentificationDto {
  @IsNotEmpty()
  @IsString()
  motorbike: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  @IsNumber()
  model_year: number;

  @IsNotEmpty()
  @IsNumber()
  km_driven: number;

  @IsNotEmpty()
  @IsNumber()
  very_serious_failures: number;

  @IsNotEmpty()
  @IsNumber()
  serious_failures: number;

  @IsNotEmpty()
  @IsNumber()
  quite_serious_failures: number;

  @IsNotEmpty()
  @IsNumber()
  medium_failures: number;

  @IsNotEmpty()
  @IsNumber()
  minor_failures: number;
}

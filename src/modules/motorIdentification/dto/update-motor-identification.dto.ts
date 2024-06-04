import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class UpdateMotorIdentificationDto {
  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  model_year: number;

  @IsOptional()
  @IsNumber()
  km_driven: number;

  @IsOptional()
  @IsNumber()
  very_serious_failures: number;

  @IsOptional()
  @IsNumber()
  serious_failures: number;

  @IsOptional()
  @IsNumber()
  quite_serious_failures: number;

  @IsOptional()
  @IsNumber()
  medium_failures: number;

  @IsOptional()
  @IsNumber()
  minor_failures: number;

  @IsOptional()
  @IsString()
  performance: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsBoolean()
  isUsed: boolean;
}

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
  @IsNumber()
  model_year: number;

  @IsOptional()
  @IsNumber()
  km_driven: number;

  @IsOptional()
  @IsNumber()
  engine_failures: number;

  @IsOptional()
  @IsNumber()
  frame_failures: number;

  @IsOptional()
  @IsNumber()
  brake_failures: number;

  @IsOptional()
  @IsNumber()
  tire_failures: number;

  @IsOptional()
  @IsNumber()
  other_failures: number;

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

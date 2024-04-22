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
  prev_broken: number;

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

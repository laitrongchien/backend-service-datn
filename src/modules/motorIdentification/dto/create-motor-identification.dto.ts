import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMotorIdentificationDto {
  @IsNotEmpty()
  @IsString()
  motorbike: string;

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
  engine_failures: number;

  @IsNotEmpty()
  @IsNumber()
  frame_failures: number;

  @IsNotEmpty()
  @IsNumber()
  brake_failures: number;

  @IsNotEmpty()
  @IsNumber()
  tire_failures: number;

  @IsNotEmpty()
  @IsNumber()
  other_failures: number;
}

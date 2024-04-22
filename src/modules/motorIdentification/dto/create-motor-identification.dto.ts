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
  prev_broken: number;
}

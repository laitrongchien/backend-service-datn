import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MotorbikeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  engine: number;

  @IsOptional()
  @IsNumber()
  maxPower: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  fuelCapacity: number;

  @IsOptional()
  @IsNumber()
  fuelConsumption: number;

  @IsOptional()
  @IsString()
  image: string;
}

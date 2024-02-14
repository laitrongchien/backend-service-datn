import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MotorBikeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  engine: number;

  @IsNotEmpty()
  @IsNumber()
  maxPower: number;

  @IsNotEmpty()
  @IsNumber()
  gearbox: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  seatHeight: number;

  @IsNotEmpty()
  @IsNumber()
  fuelCapacity: number;

  @IsNotEmpty()
  @IsNumber()
  fuelConsumption: number;

  @IsOptional()
  @IsString()
  image: string;
}

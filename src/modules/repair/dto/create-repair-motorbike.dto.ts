import { IsNumber, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRepairMotorbikeDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  cost: number;
}

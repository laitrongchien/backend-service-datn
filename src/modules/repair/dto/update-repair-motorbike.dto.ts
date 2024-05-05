import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateRepairMotorbikeDto {
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsString()
  identification: string;

  @IsOptional()
  type: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  cost: number;

  @IsOptional()
  @IsString()
  status: string;
}

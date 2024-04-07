import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMotorIdentificationDto {
  @IsNotEmpty()
  @IsString()
  identification: string;

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

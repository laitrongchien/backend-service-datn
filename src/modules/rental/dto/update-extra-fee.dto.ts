import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateExtraFeeDto {
  @IsNumber()
  @IsOptional()
  extraFee: number;

  @IsNumber()
  @IsOptional()
  compensateFee: number;

  @IsString()
  @IsOptional()
  returnNote: string;
}

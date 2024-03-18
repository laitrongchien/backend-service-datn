import {
  IsDateString,
  IsNumber,
  IsMongoId,
  IsArray,
  IsString,
} from 'class-validator';

class MotorbikeRentalDto {
  @IsMongoId()
  motorbike: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  finishDate: Date;

  @IsNumber()
  numMotorbikes: number;
}

export class CreateRentalMotorbikeDto {
  @IsArray()
  motorbikes: MotorbikeRentalDto[];

  @IsString()
  paymentType: string;

  @IsNumber()
  totalPrice: number;
}

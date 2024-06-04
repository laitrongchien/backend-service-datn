import {
  IsDateString,
  IsNumber,
  IsMongoId,
  IsArray,
  IsString,
  IsNotEmpty,
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
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  paymentType: string;

  @IsNumber()
  totalPrice: number;
}

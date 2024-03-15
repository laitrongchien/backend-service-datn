import { IsDateString, IsNumber, IsMongoId, IsArray } from 'class-validator';

class MotorbikeOrderDto {
  @IsMongoId()
  motorbike: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  finishDate: Date;

  @IsNumber()
  numberMotorbike: number;
}

export class CreateOrderMotorbikeDto {
  @IsArray()
  motorbikes: MotorbikeOrderDto[];
}

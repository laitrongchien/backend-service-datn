import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import { Schema as MongooseSchema } from 'mongoose';

export class CreateBookingTourDto {
  @IsNotEmpty()
  tour: string;

  @IsNotEmpty()
  user: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  @IsNumber()
  numberPeople: number;

  @IsOptional()
  @IsString()
  note: string;

  @IsString()
  paymentType: string;

  @IsNumber()
  totalPrice: number;
}

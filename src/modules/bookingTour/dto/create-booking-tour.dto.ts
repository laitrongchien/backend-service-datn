import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
// import { Schema as MongooseSchema } from 'mongoose';

export class CreateBookingTourDto {
  @IsNotEmpty()
  tour: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  motorbike: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  finishDate: Date;

  @IsNotEmpty()
  @IsNumber()
  numberPeople: number;

  @IsOptional()
  @IsString()
  note: string;
}

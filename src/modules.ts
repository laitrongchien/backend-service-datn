import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TourModule } from './modules/tour/tour.module';
import { MotorbikeModule } from './modules/motorbike/motorbike.module';
import { BookingTourModule } from './modules/bookingTour/bookingTour.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReviewModule } from './modules/review/review.module';
import { MotorIdentificationModule } from './modules/motorIdentification/motorIdentification.module';

export const Modules = [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rtqhapw.mongodb.net/motortours?retryWrites=true&w=majority`,
  ),
  UserModule,
  AuthModule,
  TourModule,
  MotorbikeModule,
  BookingTourModule,
  CloudinaryModule,
  PaymentModule,
  ReviewModule,
  MotorIdentificationModule,
];

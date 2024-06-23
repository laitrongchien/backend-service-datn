import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorbikeSchema } from '../../schemas/motorbike.schema';
import { FavoriteMotorbikeSchema } from '../../schemas/favoriteMotorbike.schema';
import { MotorIdentificationSchema } from '../../schemas/motorIdentification.schema';
import { MotorbikeRentalSchema } from '../../schemas/motorbikeRental.schema';
import { MotorbikeController } from './motorbike.controller';
import { MotorbikeService } from './motorbike.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Motorbike', schema: MotorbikeSchema },
      { name: 'FavoriteMotorbike', schema: FavoriteMotorbikeSchema },
      { name: 'MotorIdentification', schema: MotorIdentificationSchema },
      { name: 'MotorbikeRental', schema: MotorbikeRentalSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [MotorbikeController],
  providers: [MotorbikeService],
  exports: [MotorbikeService],
})
export class MotorbikeModule {}

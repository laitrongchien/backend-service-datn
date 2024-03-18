import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorbikeSchema } from '../../schemas/motorbike.schema';
import { FavoriteMotorbikeSchema } from 'src/schemas/favoriteMotorbike.schema';
import { MotorbikeRentalSchema } from 'src/schemas/motorbikeRental.schema';
import { MotorbikeController } from './motorbike.controller';
import { MotorbikeService } from './motorbike.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Motorbike', schema: MotorbikeSchema },
      { name: 'FavoriteMotorbike', schema: FavoriteMotorbikeSchema },
      { name: 'MotorbikeRental', schema: MotorbikeRentalSchema },
    ]),
  ],
  controllers: [MotorbikeController],
  providers: [MotorbikeService],
  exports: [MotorbikeService],
})
export class MotorbikeModule {}

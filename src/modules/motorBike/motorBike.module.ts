import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorbikeSchema } from '../../schemas/motorbike.schema';
import { FavoriteMotorbikeSchema } from 'src/schemas/favoriteMotorbike.schema';
import { OrderMotorbikeSchema } from 'src/schemas/orderMotorbike.schema';
import { MotorbikeController } from './motorbike.controller';
import { MotorbikeService } from './motorbike.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Motorbike', schema: MotorbikeSchema },
      { name: 'FavoriteMotorbike', schema: FavoriteMotorbikeSchema },
      { name: 'OrderMotorbike', schema: OrderMotorbikeSchema },
    ]),
  ],
  controllers: [MotorbikeController],
  providers: [MotorbikeService],
  exports: [MotorbikeService],
})
export class MotorbikeModule {}

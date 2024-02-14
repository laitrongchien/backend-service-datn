import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorBikeSchema } from '../../schemas/motorBike.schema';
import { MotorBikeController } from './motorBike.controller';
import { MotorBikeService } from './motorBike.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MotorBike', schema: MotorBikeSchema }]),
  ],
  controllers: [MotorBikeController],
  providers: [MotorBikeService],
  exports: [MotorBikeService],
})
export class MotorBikeModule {}

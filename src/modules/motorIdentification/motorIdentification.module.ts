import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorIdentificationSchema } from '../../schemas/motorIdentification.schema';
import { MotorIdentificationController } from './motorIdentification.controller';
import { MotorIdentificationService } from './motorIdentification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MotorIdentification', schema: MotorIdentificationSchema },
    ]),
  ],
  controllers: [MotorIdentificationController],
  providers: [MotorIdentificationService],
  exports: [MotorIdentificationService],
})
export class MotorIdentificationModule {}

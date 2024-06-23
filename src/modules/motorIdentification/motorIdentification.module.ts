import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorIdentificationSchema } from '../../schemas/motorIdentification.schema';
import { MotorIdentificationController } from './motorIdentification.controller';
import { MotorIdentificationService } from './motorIdentification.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MotorIdentification', schema: MotorIdentificationSchema },
    ]),
    NotificationModule,
  ],
  controllers: [MotorIdentificationController],
  providers: [MotorIdentificationService],
  exports: [MotorIdentificationService],
})
export class MotorIdentificationModule {}

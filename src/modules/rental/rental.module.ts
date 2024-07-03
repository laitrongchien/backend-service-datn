import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorbikeRentalSchema } from '../../schemas/motorbikeRental.schema';
import { MotorIdentificationSchema } from '../../schemas/motorIdentification.schema';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MotorbikeRental', schema: MotorbikeRentalSchema },
      { name: 'MotorIdentification', schema: MotorIdentificationSchema },
    ]),
    NotificationModule,
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}

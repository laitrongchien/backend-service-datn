import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingTourSchema } from '../../schemas/bookingTour.schema';
import { TourSchema } from '../../schemas/tour.schema';
import { BookingTourController } from './bookingTour.controller';
import { BookingTourService } from './bookingTour.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BookingTour', schema: BookingTourSchema },
      { name: 'Tour', schema: TourSchema },
    ]),
    NotificationModule,
  ],
  controllers: [BookingTourController],
  providers: [BookingTourService],
  exports: [BookingTourService],
})
export class BookingTourModule {}

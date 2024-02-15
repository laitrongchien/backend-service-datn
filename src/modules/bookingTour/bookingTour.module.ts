import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingTourSchema } from '../../schemas/bookingTour.schema';
import { BookingTourController } from './bookingTour.controller';
import { BookingTourService } from './bookingTour.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BookingTour', schema: BookingTourSchema },
    ]),
  ],
  controllers: [BookingTourController],
  providers: [BookingTourService],
  exports: [BookingTourService],
})
export class BookingTourModule {}

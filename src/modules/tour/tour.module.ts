import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourSchema } from '../../schemas/tour.schema';
import { FavoriteTourSchema } from '../../schemas/favoriteTour.schema';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tour', schema: TourSchema },
      { name: 'FavoriteTour', schema: FavoriteTourSchema },
    ]),
  ],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}

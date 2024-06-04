import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from 'src/schemas/location.schema';
import { MotorIdentificationSchema } from 'src/schemas/motorIdentification.schema';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Location', schema: LocationSchema },
      { name: 'MotorIdentification', schema: MotorIdentificationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorbikeRentalSchema } from '../../schemas/motorbikeRental.schema';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MotorbikeRental', schema: MotorbikeRentalSchema },
    ]),
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}

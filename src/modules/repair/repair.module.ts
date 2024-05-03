import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepairSchema } from '../../schemas/repair.schema';
import { RepairController } from './repair.controller';
import { RepairService } from './repair.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repair', schema: RepairSchema }]),
  ],
  controllers: [RepairController],
  providers: [RepairService],
  exports: [RepairService],
})
export class RepairModule {}

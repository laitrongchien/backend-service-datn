import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repair } from 'src/schemas/repair.schema';
import { CreateRepairMotorbikeDto } from './dto/create-repair-motorbike.dto';
import { UpdateRepairMotorbikeDto } from './dto/update-repair-motorbike.dto';

@Injectable()
export class RepairService {
  constructor(
    @InjectModel(Repair.name)
    private readonly repairModel: Model<Repair>,
  ) {}
  async createRepairMotorbike(
    createRepairMotorbikeData: CreateRepairMotorbikeDto,
  ) {
    const newRepair = new this.repairModel(createRepairMotorbikeData);
    return await newRepair.save();
  }

  async getAllRepairs() {
    return await this.repairModel.find().sort({ createdAt: -1 });
  }

  async updateRepairMotorbike(
    id: string,
    updateRepairMotorbikeData: UpdateRepairMotorbikeDto,
  ) {
    return await this.repairModel.findByIdAndUpdate(
      id,
      updateRepairMotorbikeData,
      {
        new: true,
      },
    );
  }
}

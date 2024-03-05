import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorBike } from '../../schemas/motorBike.schema';
import { MotorBikeDto } from './dto/motorBike.dto';

@Injectable()
export class MotorBikeService {
  constructor(
    @InjectModel(MotorBike.name)
    private readonly motorBikeModel: Model<MotorBike>,
  ) {}

  async createMotorBike(createMotorBikeData: MotorBikeDto) {
    const createdMotorBike = new this.motorBikeModel(createMotorBikeData);
    return createdMotorBike.save();
  }

  async getMotorBikeById(id: string) {
    return this.motorBikeModel.findById(id);
  }

  async getAllMotorBikes() {
    return this.motorBikeModel.find();
  }

  async updateMotorBike(id: string, updateMotorBikeData: MotorBikeDto) {
    return this.motorBikeModel.findByIdAndUpdate(id, updateMotorBikeData, {
      new: true,
    });
  }

  async deleteMotorBike(id: string) {
    return this.motorBikeModel.findByIdAndDelete(id);
  }
}

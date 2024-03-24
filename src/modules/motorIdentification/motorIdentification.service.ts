import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorIdentification } from 'src/schemas/motorIdentification.schema';
import { CreateMotorIdentificationDto } from './dto/create-motor-identification.dto';

@Injectable()
export class MotorIdentificationService {
  constructor(
    @InjectModel(MotorIdentification.name)
    private readonly motorIdentificationModel: Model<MotorIdentification>,
  ) {}

  async createMotorIdentification(
    createMotorIdentificationData: CreateMotorIdentificationDto,
  ) {
    const createdMotorIdentification = new this.motorIdentificationModel(
      createMotorIdentificationData,
    );
    return await createdMotorIdentification.save();
  }

  async getMotorIdentificationById(id: string) {
    return await this.motorIdentificationModel.findById(id);
  }

  async getAllMotorIdentifications() {
    return await this.motorIdentificationModel
      .find()
      .populate({ path: 'motorbike', select: 'name' });
  }
}

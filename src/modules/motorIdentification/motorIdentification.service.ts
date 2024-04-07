import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorIdentification } from 'src/schemas/motorIdentification.schema';
import { CreateMotorIdentificationDto } from './dto/create-motor-identification.dto';
import { UpdateMotorIdentificationDto } from './dto/update-motor-identification.dto';
// import { Cron, CronExpression } from '@nestjs/schedule';

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

  async updateMotorByIdentification(
    updateMotorIdentificationData: UpdateMotorIdentificationDto,
  ) {
    return await this.motorIdentificationModel.findOneAndUpdate(
      { identification: updateMotorIdentificationData.identification },
      updateMotorIdentificationData,
      { new: true },
    );
  }

  async getMotorIdentificationById(id: string) {
    return await this.motorIdentificationModel.findById(id);
  }

  async getAllMotorIdentifications() {
    return await this.motorIdentificationModel
      .find()
      .populate({ path: 'motorbike', select: 'name' });
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // async calculateMotorPerformance() {
  //   console.log('calculate');
  // }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorIdentification } from 'src/schemas/motorIdentification.schema';
import { CreateMotorIdentificationDto } from './dto/create-motor-identification.dto';
import { UpdateMotorIdentificationDto } from './dto/update-motor-identification.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
// import { PythonShell } from 'python-shell';
// import * as path from 'path';

@Injectable()
export class MotorIdentificationService {
  private model: any;

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
    return (await createdMotorIdentification.save()).populate({
      path: 'motorbike',
      select: 'name',
    });
  }

  async importMotorIdentification(
    importMotorIdentificationData: CreateMotorIdentificationDto[],
  ) {
    const createdMotorIdentifications = importMotorIdentificationData.map(
      (data) => new this.motorIdentificationModel(data),
    );
    const savedMotorIdentifications = await Promise.all(
      createdMotorIdentifications.map(async (motorIdentification) =>
        (await motorIdentification.save()).populate({
          path: 'motorbike',
          select: 'name',
        }),
      ),
    );
    return savedMotorIdentifications;
  }

  async updateMotorByIdentification(
    updateMotorIdentificationData: UpdateMotorIdentificationDto,
  ) {
    return await this.motorIdentificationModel
      .findOneAndUpdate(
        { identification: updateMotorIdentificationData.identification },
        updateMotorIdentificationData,
        { new: true },
      )
      .populate({
        path: 'motorbike',
        select: 'name',
      });
  }

  async deleteMotorIdentification(id: string) {
    return await this.motorIdentificationModel.findByIdAndDelete(id);
  }

  async getMotorIdentificationById(id: string) {
    return await this.motorIdentificationModel.findById(id);
  }

  async getMotorByIdentification(identification: string) {
    return await this.motorIdentificationModel.findOne({
      identification: identification,
    });
  }

  async getAllMotorIdentifications() {
    return await this.motorIdentificationModel
      .find()
      .populate({ path: 'motorbike', select: 'name' });
  }

  async getAllAvailableMotor(motorbikeId: string) {
    return await this.motorIdentificationModel.find({
      motorbike: motorbikeId,
      status: 'normal',
      isUsed: false,
      performance: { $in: ['good', 'medium'] },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async calculateMotorPerformance() {
    console.log('calculate');
    // const motorIdentifications = await this.motorIdentificationModel.find();

    // motorIdentifications.forEach(async (motorIdentification: any) => {
    //   const data = motorIdentification.toObject();
    //   // console.log(data);
    //   const overall_failure =
    //     (data.engine_failures * 0.8 +
    //       data.frame_failures * 0.6 +
    //       data.brake_failures * 0.4 +
    //       data.tire_failures * 0.2 +
    //       data.other_failures * 0.1) /
    //     (data.engine_failures +
    //       data.frame_failures +
    //       data.brake_failures +
    //       data.tire_failures +
    //       data.other_failures);
    //   const inputData = [
    //     [data.km_driven, overall_failure, 2024 - data.model_year],
    //   ];
    //   const scriptPath = path.join(
    //     __dirname,
    //     '../../../src/scripts/load_model.py',
    //   );

    //   let performanceValue = '';

    //   PythonShell.run(scriptPath, {
    //     args: [JSON.stringify(inputData)],
    //     pythonOptions: ['-u'],
    //   }).then(async (results) => {
    //     performanceValue =
    //       results[0] === '0' ? 'good' : results[0] === '1' ? 'medium' : 'bad';
    //     console.log(performanceValue);
    //     await this.motorIdentificationModel.findByIdAndUpdate(
    //       motorIdentification._id,
    //       { performance: performanceValue },
    //       { new: true },
    //     );
    //   });
    // });
  }
}

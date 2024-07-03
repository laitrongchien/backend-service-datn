import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorIdentification } from 'src/schemas/motorIdentification.schema';
import { CreateMotorIdentificationDto } from './dto/create-motor-identification.dto';
import { UpdateMotorIdentificationDto } from './dto/update-motor-identification.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from '../notification/notification.service';
// import {
//   VERY_SERIOUS_FAILURE_IMPACT,
//   SERIOUS_FAILURE_IMPACT,
//   QUITE_SERIOUS_FAILURE_IMPACT,
//   MEDIUM_FAILURE_IMPACT,
//   MINOR_FAILURE_IMPACT,
// } from './motorIdentification.constant';
// import { PythonShell } from 'python-shell';
// import * as path from 'path';

@Injectable()
export class MotorIdentificationService {
  private model: any;

  constructor(
    @InjectModel(MotorIdentification.name)
    private readonly motorIdentificationModel: Model<MotorIdentification>,
    private notificationService: NotificationService,
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

  async getAllAvailableMotor(
    motorbikeId: string,
    location: string,
    isForTour: boolean,
    isTempoRent: boolean,
  ) {
    const query: any = {
      motorbike: motorbikeId,
      status: 'normal',
      isUsed: false,
      performance: { $in: ['good', 'medium'] },
      location: location,
      isForTour: isForTour,
    };

    if (isTempoRent !== undefined) {
      query.isTempoRent = undefined;
    }
    return await this.motorIdentificationModel.find(query);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async calculateMotorPerformance() {
    console.log('calculate');
    // const motorIdentifications = await this.motorIdentificationModel.find();

    // motorIdentifications.forEach(async (motorIdentification: any) => {
    //   const data = motorIdentification.toObject();
    //   const overall_failures =
    //     VERY_SERIOUS_FAILURE_IMPACT * data.very_serious_failures +
    //     SERIOUS_FAILURE_IMPACT * data.serious_failures +
    //     QUITE_SERIOUS_FAILURE_IMPACT * data.quite_serious_failures +
    //     MEDIUM_FAILURE_IMPACT * data.medium_failures +
    //     MINOR_FAILURE_IMPACT * data.minor_failures;
    //   const inputData = [
    //     [data.km_driven, overall_failures, 2024 - data.model_year],
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
    //     await this.motorIdentificationModel.findByIdAndUpdate(
    //       motorIdentification._id,
    //       { performance: performanceValue },
    //       { new: true },
    //     );
    //   });
    // });
  }

  @Cron(CronExpression.EVERY_DAY_AT_3PM)
  async calculateWhenMaintain() {
    console.log('calculate');
    const motorIdentifications = await this.motorIdentificationModel
      .find()
      .populate({ path: 'motorbike', select: 'maintainSchedule' });

    await Promise.all(
      motorIdentifications.map(async (motorIdentification: any) => {
        if (motorIdentification.lastMaintain.length === 0) {
          return;
        }

        let needsUpdate = false;

        motorIdentification.lastMaintain.forEach(
          (lastMaintainItem: {
            type: string;
            lastKm: number;
            lastDate: Date;
          }) => {
            const schedule =
              motorIdentification.motorbike.maintainSchedule.find(
                (s: any) => s.type === lastMaintainItem.type,
              );
            let isDue = false;
            if (schedule.unit === 'km') {
              const leftKm =
                motorIdentification.km_driven - lastMaintainItem.lastKm;
              console.log(leftKm);

              if (leftKm >= schedule.quantity) isDue = true;
            } else {
              const leftTime =
                (new Date().getTime() -
                  new Date(lastMaintainItem.lastDate).getTime()) /
                (1000 * 24 * 60 * 60);
              console.log(leftTime);
              if (leftTime >= schedule.quantity) isDue = true;
            }

            if (isDue) {
              lastMaintainItem.lastDate = new Date();
              lastMaintainItem.lastKm = motorIdentification.km_driven;
              needsUpdate = true;
              this.notificationService.sendNotification({
                message: `Xe ${motorIdentification.identification} đến hạn ${lastMaintainItem.type}`,
                notificationType: 'maintainance',
                user: '65be63ddb6e177fc5fdc9da3',
              });
            }
          },
        );
        if (needsUpdate) {
          const updateOperations = motorIdentification.lastMaintain.map(
            (item: any) => ({
              updateOne: {
                filter: {
                  _id: motorIdentification._id,
                  'lastMaintain.type': item.type,
                },
                update: {
                  $set: {
                    'lastMaintain.$.lastDate': item.lastDate,
                    'lastMaintain.$.lastKm': item.lastKm,
                  },
                },
              },
            }),
          );

          await this.motorIdentificationModel.bulkWrite(updateOperations);
        }
      }),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorbikeRental } from 'src/schemas/motorbikeRental.schema';
import { MotorIdentification } from 'src/schemas/motorIdentification.schema';
import { CreateRentalMotorbikeDto } from './dto/create-rental-motorbike.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { UpdateExtraFeeDto } from './dto/update-extra-fee.dto';
import { NotificationService } from '../notification/notification.service';
import { NOT_RECEIVED_STATUS } from './rental.constant';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel(MotorbikeRental.name)
    private readonly motorbikeRentalModel: Model<MotorbikeRental>,
    @InjectModel(MotorIdentification.name)
    private readonly motorIdentificationModel: Model<MotorIdentification>,
    private notificationService: NotificationService,
  ) {}

  async createRentalMotorbike(
    userId: string,
    createRentalMotorbikeDto: CreateRentalMotorbikeDto,
  ) {
    const newRental = new this.motorbikeRentalModel({
      user: userId,
      phone: createRentalMotorbikeDto.phone,
      motorbikes: createRentalMotorbikeDto.motorbikes,
      location: createRentalMotorbikeDto.location,
      paymentType: createRentalMotorbikeDto.paymentType,
      totalPrice: createRentalMotorbikeDto.totalPrice,
    });
    await this.notificationService.sendNotification({
      user: userId,
      message: 'Đơn thuê xe mới',
      notificationType: 'motor-rental',
    });
    return await newRental.save();
  }

  async getAllMotorbikeRentals() {
    return await this.motorbikeRentalModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'motorbikes',
        populate: { path: 'motorbike', select: 'name' },
      })
      .populate({ path: 'user', select: 'name email' });
  }

  async getMotorbikeRentalsByUser(userId: string) {
    return await this.motorbikeRentalModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
  }

  async getMotorbikeRentalDetail(rentalId: string) {
    return await this.motorbikeRentalModel
      .findById(rentalId)
      .populate({
        path: 'motorbikes',
        populate: { path: 'motorbike', select: 'name image price' },
      })
      .populate({ path: 'user', select: 'name email' });
  }

  async updateRentalStatus(
    id: string,
    updateRentalStatus: UpdateRentalStatusDto,
  ) {
    const rental = await this.motorbikeRentalModel.findByIdAndUpdate(
      id,
      { status: updateRentalStatus.status },
      { new: true },
    );
    if (updateRentalStatus.status === NOT_RECEIVED_STATUS) {
      const numMotorbikes = rental.motorbikes.reduce(
        (acc, curr) => acc + curr.numMotorbikes,
        0,
      );
      const randomDocs = await this.motorIdentificationModel.aggregate([
        {
          $match: {
            motorbike: rental.motorbikes[0].motorbike,
            isTempoRent: true,
          },
        },
        { $sample: { size: numMotorbikes } },
      ]);

      for (const doc of randomDocs) {
        await this.motorIdentificationModel.updateOne(
          { _id: doc._id },
          { $unset: { isTempoRent: '' } },
        );
      }
    }
    return rental;
  }

  async updateExtraFee(id: string, updateExtraFeeData: UpdateExtraFeeDto) {
    return await this.motorbikeRentalModel.findByIdAndUpdate(
      id,
      updateExtraFeeData,
      { new: true },
    );
  }

  async cancelRentalOrder(id: string) {
    const rental = await this.motorbikeRentalModel.findByIdAndUpdate(
      id,
      { status: 'cancel' },
      { new: true },
    );
    const numMotorbikes = rental.motorbikes.reduce(
      (acc, curr) => acc + curr.numMotorbikes,
      0,
    );
    const randomDocs = await this.motorIdentificationModel.aggregate([
      {
        $match: {
          motorbike: rental.motorbikes[0].motorbike,
          isTempoRent: true,
        },
      },
      { $sample: { size: numMotorbikes } },
    ]);

    for (const doc of randomDocs) {
      await this.motorIdentificationModel.updateOne(
        { _id: doc._id },
        { $unset: { isTempoRent: '' } },
      );
    }
    return rental;
  }

  async updateIdentificationsRental(id: string, identifications: string[]) {
    const rental = await this.motorbikeRentalModel.findByIdAndUpdate(
      id,
      { $set: { 'motorbikes.0.identifications': identifications } },
      { new: true },
    );
    const randomDocs = await this.motorIdentificationModel.aggregate([
      {
        $match: {
          motorbike: rental.motorbikes[0].motorbike,
          isTempoRent: true,
        },
      },
      { $sample: { size: identifications.length } },
    ]);

    for (const doc of randomDocs) {
      await this.motorIdentificationModel.updateOne(
        { _id: doc._id },
        { $unset: { isTempoRent: '' } },
      );
    }
    return rental;
  }
}

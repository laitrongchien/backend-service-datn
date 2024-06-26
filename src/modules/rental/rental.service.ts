import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorbikeRental } from 'src/schemas/motorbikeRental.schema';
import { CreateRentalMotorbikeDto } from './dto/create-rental-motorbike.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { UpdateExtraFeeDto } from './dto/update-extra-fee.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel(MotorbikeRental.name)
    private readonly motorbikeRentalModel: Model<MotorbikeRental>,
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
    return await this.motorbikeRentalModel.findByIdAndUpdate(
      id,
      { status: updateRentalStatus.status },
      { new: true },
    );
  }

  async updateExtraFee(id: string, updateExtraFeeData: UpdateExtraFeeDto) {
    return await this.motorbikeRentalModel.findByIdAndUpdate(
      id,
      updateExtraFeeData,
      { new: true },
    );
  }

  async updateIdentificationsRental(id: string, identifications: string[]) {
    const rental = await this.motorbikeRentalModel.findById(id);
    rental.motorbikes[0].identifications = identifications;
    return await rental.save();
  }
}

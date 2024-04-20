import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotorbikeRental } from 'src/schemas/motorbikeRental.schema';
import { CreateRentalMotorbikeDto } from './dto/create-rental-motorbike.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel(MotorbikeRental.name)
    private readonly motorbikeRentalModel: Model<MotorbikeRental>,
  ) {}

  async createRentalMotorbike(
    userId: string,
    createRentalMotorbikeDto: CreateRentalMotorbikeDto,
  ) {
    const newRental = new this.motorbikeRentalModel({
      user: userId,
      motorbikes: createRentalMotorbikeDto.motorbikes,
      paymentType: createRentalMotorbikeDto.paymentType,
      totalPrice: createRentalMotorbikeDto.totalPrice,
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
    return await this.motorbikeRentalModel.find({ user: userId });
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

  async updateIdentificationsRental(id: string, identifications: string[]) {
    const rental = await this.motorbikeRentalModel.findById(id);
    rental.motorbikes[0].identifications = identifications;
    return await rental.save();
  }
}

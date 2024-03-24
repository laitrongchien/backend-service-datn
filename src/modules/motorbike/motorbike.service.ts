import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Motorbike } from '../../schemas/motorbike.schema';
import { FavoriteMotorbike } from '../../schemas/favoriteMotorbike.schema';
import { MotorbikeRental } from 'src/schemas/motorbikeRental.schema';
import { MotorbikeDto } from './dto/motorbike.dto';
import { CreateRentalMotorbikeDto } from './dto/create-rental-motorbike.dto';

@Injectable()
export class MotorbikeService {
  constructor(
    @InjectModel(Motorbike.name)
    private readonly motorbikeModel: Model<Motorbike>,
    @InjectModel(FavoriteMotorbike.name)
    private readonly favoriteMotorbikeModel: Model<FavoriteMotorbike>,
    @InjectModel(MotorbikeRental.name)
    private readonly motorbikeRentalModel: Model<MotorbikeRental>,
  ) {}

  async createMotorbike(createMotorbikeData: MotorbikeDto) {
    const createdMotorbike = new this.motorbikeModel(createMotorbikeData);
    return await createdMotorbike.save();
  }

  async getMotorbikeById(id: string) {
    return await this.motorbikeModel.findById(id);
  }

  async getAllMotorbikes(
    filterOptions: any,
    sortOptions: any,
    page: number,
    limit: number,
    userId: string,
  ) {
    const skip = (page - 1) * limit;
    const findMotorbikes = await this.motorbikeModel
      .find(filterOptions)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const motorbikes = await Promise.all(
      findMotorbikes.map(async (motorbike) => {
        const favorite = await this.favoriteMotorbikeModel.findOne({
          motorbike: motorbike._id,
          user: userId,
        });

        motorbike.isFavorite = !!favorite;

        return motorbike;
      }),
    );
    const totalMotorbikes =
      await this.motorbikeModel.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalMotorbikes / limit);
    return { motorbikes, totalPages };
  }

  async getFavoriteMotorbike(userId: string) {
    return await this.favoriteMotorbikeModel
      .find({ user: userId })
      .populate('motorbike');
  }

  async updateMotorbike(id: string, updateMotorbikeData: MotorbikeDto) {
    return await this.motorbikeModel.findByIdAndUpdate(
      id,
      updateMotorbikeData,
      {
        new: true,
      },
    );
  }

  async deleteMotorbike(id: string) {
    return await this.motorbikeModel.findByIdAndDelete(id);
  }

  async likeMotorbike(userId: string, motorbikeId: string) {
    const existingFavorite = await this.favoriteMotorbikeModel.findOne({
      motorbike: motorbikeId,
      user: userId,
    });
    if (existingFavorite) {
      await existingFavorite.deleteOne();
      return { isFavorite: false };
    } else {
      const favoritedMotorbike = new this.favoriteMotorbikeModel({
        motorbike: motorbikeId,
        user: userId,
      });
      await favoritedMotorbike.save();
      return { isFavorite: true };
    }
  }

  async unlikeMotorbike(userId: string, motorbikeId: string) {
    return await this.favoriteMotorbikeModel.findOneAndDelete({
      user: userId,
      motorbike: motorbikeId,
    });
  }

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
    return await this.motorbikeRentalModel.findById(rentalId).populate({
      path: 'motorbikes',
      populate: { path: 'motorbike', select: 'name image price' },
    });
  }
}

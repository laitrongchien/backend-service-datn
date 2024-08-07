import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Motorbike } from '../../schemas/motorbike.schema';
import { FavoriteMotorbike } from '../../schemas/favoriteMotorbike.schema';
import { MotorIdentification } from '../../schemas/motorIdentification.schema';
import { MotorbikeRental } from '../../schemas/motorbikeRental.schema';
import { MotorbikeDto } from './dto/motorbike.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import {
  ENGINE_VALUE,
  MEDIUM_DISTANCE,
  SHORT_DISTANCE,
} from './motorbike.constant';

@Injectable()
export class MotorbikeService {
  constructor(
    @InjectModel(Motorbike.name)
    private readonly motorbikeModel: Model<Motorbike>,
    @InjectModel(FavoriteMotorbike.name)
    private readonly favoriteMotorbikeModel: Model<FavoriteMotorbike>,
    @InjectModel(MotorIdentification.name)
    private readonly motorIdentificationModel: Model<MotorIdentification>,
    @InjectModel(MotorbikeRental.name)
    private readonly motorbikeRentalModel: Model<MotorbikeRental>,
    private cloudinaryService: CloudinaryService,
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
        const numOfMotorIdentifications =
          await this.motorIdentificationModel.countDocuments({
            motorbike: motorbike._id,
          });

        motorbike.isFavorite = !!favorite;

        return { ...motorbike.toObject(), numOfMotorIdentifications };
      }),
    );
    const totalMotorbikes =
      await this.motorbikeModel.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalMotorbikes / limit);
    return { motorbikes, totalPages };
  }

  async getPopularMotorbikes() {
    return await this.motorbikeModel
      .find()
      .sort({ ratingsAverage: -1, ratingsQuantity: -1 })
      .limit(6);
  }

  async getFavoriteMotorbike(userId: string) {
    return await this.favoriteMotorbikeModel
      .find({ user: userId })
      .populate('motorbike');
  }

  async updateMotorbike(id: string, updateMotorbikeData: MotorbikeDto) {
    const motorbike = await this.motorbikeModel.findByIdAndUpdate(
      id,
      updateMotorbikeData,
      {
        new: true,
      },
    );
    const numOfMotorIdentifications =
      await this.motorIdentificationModel.countDocuments({
        motorbike: id,
      });
    return { ...motorbike.toObject(), numOfMotorIdentifications };
  }

  async updateMotorMaintainSchedule(
    id: string,
    maintainSchedule: { type: string; quantity: number; unit: string }[],
  ) {
    return await this.motorbikeModel.findByIdAndUpdate(
      id,
      { maintainSchedule },
      { new: true },
    );
  }

  async deleteMotorbike(id: string) {
    const deleteMotorbike = await this.motorbikeModel.findByIdAndDelete(id);
    if (deleteMotorbike) {
      await this.favoriteMotorbikeModel.deleteMany({ motorbike: id });
      await this.motorIdentificationModel.deleteMany({ motorbike: id });
      await this.motorbikeRentalModel.updateMany(
        { 'motorbikes.motorbike': id },
        {
          $set: {
            'motorbikes.$[elem].motorbikeHistory': {
              name: deleteMotorbike.name,
              image: deleteMotorbike.image,
              price: deleteMotorbike.price,
            },
          },
        },
        {
          arrayFilters: [{ 'elem.motorbike': id }],
        },
      );
    }
    return deleteMotorbike;
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

  async uploadMotorbikeImage(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(
        file,
        'motortour/images/motorbike',
      );
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }
  }

  async getSuggestMotorbikes(distance: number) {
    const suggestQuery =
      distance > SHORT_DISTANCE.MIN && distance <= SHORT_DISTANCE.MAX
        ? { type: { $in: ['semi-automatic', 'automatic'] } }
        : distance > MEDIUM_DISTANCE.MIN && distance <= MEDIUM_DISTANCE.MAX
          ? { type: 'manual', engine: { $lte: ENGINE_VALUE } }
          : { type: 'manual', engine: { $gt: ENGINE_VALUE } };
    return await this.motorbikeModel.find(suggestQuery);
  }
}

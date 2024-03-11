import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour } from '../../schemas/tour.schema';
import { FavoriteTour } from '../../schemas/favoriteTour.schema';
import { TourDto } from './dto/tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
    @InjectModel(FavoriteTour.name)
    private readonly favoriteTourModel: Model<FavoriteTour>,
  ) {}

  async createTour(createTourData: TourDto) {
    const createdTour = new this.tourModel(createTourData);
    return await createdTour.save();
  }

  async getTourById(id: string) {
    return await this.tourModel.findById(id);
  }

  async getAllTours(page: number, limit: number, userId: string) {
    const skip = (page - 1) * limit;
    const findTours = await this.tourModel.find().skip(skip).limit(limit);
    const tours = await Promise.all(
      findTours.map(async (tour) => {
        const favorite = await this.favoriteTourModel.findOne({
          tour: tour._id,
          user: userId,
        });

        tour.isFavorite = !!favorite;

        return tour;
      }),
    );
    const totalTours = await this.tourModel.countDocuments();
    const totalPages = Math.ceil(totalTours / limit);
    return { tours, totalPages };
  }

  async getPopularTours() {
    const tours = await this.tourModel.find();
    return tours;
  }

  async getFavoriteTour(userId: string) {
    return await this.favoriteTourModel.find({ user: userId }).populate('tour');
  }

  async updateTour(id: string, updateTourDto: TourDto) {
    return await this.tourModel.findByIdAndUpdate(id, updateTourDto, {
      new: true,
    });
  }

  async deleteTour(id: string) {
    return await this.tourModel.findByIdAndDelete(id);
  }

  async likeTour(userId: string, tourId: string) {
    const existingFavorite = await this.favoriteTourModel.findOne({
      tour: tourId,
      user: userId,
    });
    if (existingFavorite) {
      await existingFavorite.deleteOne();
      return { isFavorite: false };
    } else {
      const favoritedTour = new this.favoriteTourModel({
        tour: tourId,
        user: userId,
      });
      await favoritedTour.save();
      return { isFavorite: true };
    }
  }

  async unlikeTour(userId: string, tourId: string) {
    return await this.favoriteTourModel.findOneAndDelete({
      user: userId,
      tour: tourId,
    });
  }
}

import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour } from '../../schemas/tour.schema';
import { FavoriteTour } from '../../schemas/favoriteTour.schema';
import { SelfTour } from '../../schemas/selfTour.schema';
import { BookingTour } from '../../schemas/bookingTour.schema';
import { TourDto } from './dto/tour.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateSelfTourDto } from './dto/create-self-tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
    @InjectModel(FavoriteTour.name)
    private readonly favoriteTourModel: Model<FavoriteTour>,
    @InjectModel(SelfTour.name) private readonly selfTourModel: Model<SelfTour>,
    @InjectModel(BookingTour.name)
    private readonly bookingTourModel: Model<BookingTour>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createTour(createTourData: TourDto) {
    const existingTour = await this.tourModel.findOne({
      name: createTourData.name,
    });

    if (existingTour) {
      throw new HttpException('Tour name must be unique', HttpStatus.CONFLICT);
    }
    const createdTour = new this.tourModel(createTourData);
    return await createdTour.save();
  }

  async createSelfTour(userId: string, createSelfTourDto: CreateSelfTourDto) {
    return await new this.selfTourModel({
      user: userId,
      ...createSelfTourDto,
    }).save();
  }

  async getAllSelfTours(userId: string) {
    return await this.selfTourModel.find({ user: userId });
  }

  async getSelfTourById(id: string) {
    return await this.selfTourModel.findById(id);
  }

  async getTourById(id: string) {
    return (await this.tourModel.findById(id)).populate({
      path: 'motorForTour',
    });
  }

  async getAllTours(
    page: number,
    limit: number,
    userId: string,
    startLocation: string,
    minDuration: number,
    maxDuration: number,
  ) {
    const skip = (page - 1) * limit;
    let query: any = startLocation ? { startLocation } : {};
    if (minDuration) {
      if (maxDuration)
        query = {
          ...query,
          duration: { $gte: minDuration, $lte: maxDuration },
        };
      else
        query = {
          ...query,
          duration: { $gte: minDuration },
        };
    }
    const findTours = await this.tourModel.find(query).skip(skip).limit(limit);
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
    const totalTours = await this.tourModel.countDocuments(query);
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

  async updateRemainGuestOfTour(id: string, availableRemain: number) {
    return await this.tourModel.findByIdAndUpdate(
      id,
      { availableRemain },
      { new: true },
    );
  }

  async deleteTour(id: string) {
    const deleteTour = await this.tourModel.findByIdAndDelete(id);
    if (deleteTour) {
      await this.favoriteTourModel.deleteMany({ tour: id });
      await this.bookingTourModel.updateMany(
        { tour: id },
        {
          tourHistory: {
            name: deleteTour.name,
            imageCover: deleteTour.imageCover,
            price: deleteTour.price,
          },
        },
      );
    }
    return deleteTour;
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

  async uploadTourImage(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(
        file,
        'motortour/images/tour',
      );
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }
  }
}

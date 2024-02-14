import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour } from '../../schemas/tour.schema';
import { TourDto } from './dto/tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
  ) {}

  async createTour(createTourData: TourDto) {
    const createdTour = new this.tourModel(createTourData);
    return createdTour.save();
  }

  async getTourById(id: string) {
    return this.tourModel.findById(id);
  }

  async getAllTours() {
    return this.tourModel.find();
  }

  async updateTour(id: string, updateTourDto: TourDto) {
    return this.tourModel.findByIdAndUpdate(id, updateTourDto, { new: true });
  }

  async deleteTour(id: string) {
    return this.tourModel.findByIdAndDelete(id);
  }
}

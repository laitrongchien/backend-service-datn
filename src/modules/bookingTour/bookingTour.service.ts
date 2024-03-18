import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingTour } from '../../schemas/bookingTour.schema';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';

@Injectable()
export class BookingTourService {
  constructor(
    @InjectModel(BookingTour.name)
    private readonly bookingTourModel: Model<BookingTour>,
  ) {}

  async createBookingTour(createBookingTourData: CreateBookingTourDto) {
    const createdBookingTour = new this.bookingTourModel(createBookingTourData);
    return await createdBookingTour.save();
  }

  async getBookingTourById(id: string) {
    return await this.bookingTourModel.findById(id);
  }

  async getBookingTourByUser(userId: string) {
    return await this.bookingTourModel.find({ user: userId });
  }

  async getAllBookingTours() {
    return await this.bookingTourModel.find().populate('user').populate('tour');
  }
}

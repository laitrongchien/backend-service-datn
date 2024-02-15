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
    return createdBookingTour.save();
  }

  async getBookingTourById(id: string) {
    return this.bookingTourModel.findById(id);
  }

  async getAllBookingTours() {
    return this.bookingTourModel.find().populate('user').populate('tour');
  }
}

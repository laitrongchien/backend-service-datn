import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingTour } from '../../schemas/bookingTour.schema';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { UpdateBookingTourStatusDto } from './dto/update-booking-tour-status.dto';

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

  async updateBookingTourStatus(
    id: string,
    updateBookingTourStatus: UpdateBookingTourStatusDto,
  ) {
    return await this.bookingTourModel.findByIdAndUpdate(
      id,
      { status: updateBookingTourStatus.status },
      { new: true },
    );
  }

  async getBookingTourById(id: string) {
    return await this.bookingTourModel
      .findById(id)
      .populate({ path: 'tour' })
      .populate({ path: 'user', select: 'name email' });
  }

  async getBookingTourByUser(userId: string) {
    return await this.bookingTourModel.find({ user: userId });
  }

  async getAllBookingTours() {
    return await this.bookingTourModel
      .find()
      .populate({ path: 'user', select: 'name email' });
  }
}

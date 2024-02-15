import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BookingTourService } from './bookingTour.service';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('booking/tour')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.bookingTourService.getAllBookingTours();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.bookingTourService.getBookingTourById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBookingTourDto: CreateBookingTourDto) {
    return this.bookingTourService.createBookingTour(createBookingTourDto);
  }
}

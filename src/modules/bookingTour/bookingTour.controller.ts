import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BookingTourService } from './bookingTour.service';
import { CreateBookingTourDto } from './dto/create-booking-tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('booking')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.bookingTourService.getAllBookingTours();
  }

  @Get('/get-booking-tour/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.bookingTourService.getBookingTourById(id);
  }

  @Post('/create-booking-tour')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBookingTourDto: CreateBookingTourDto) {
    return this.bookingTourService.createBookingTour(createBookingTourDto);
  }

  @Get('/get-user-booking-tour')
  @UseGuards(JwtAuthGuard)
  async getBookingTourByUser(@Req() req: Request) {
    return this.bookingTourService.getBookingTourByUser(req?.user['sub']);
  }
}

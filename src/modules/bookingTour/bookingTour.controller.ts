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
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('booking')
export class BookingTourController {
  constructor(private readonly bookingTourService: BookingTourService) {}

  @Get('all')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
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

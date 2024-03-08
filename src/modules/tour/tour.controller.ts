import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TourService } from './tour.service';
import { TourDto } from './dto/tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.tourService.getAllTours(page, limit);
  }

  @Get('/popular-tours')
  async findPopularTours() {
    return this.tourService.getPopularTours();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tourService.getTourById(id);
  }

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createTourDto: TourDto) {
    return this.tourService.createTour(createTourDto);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updateTourDto: TourDto) {
    return this.tourService.updateTour(id, updateTourDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.tourService.deleteTour(id);
  }

  @Post('like-tour/:id')
  @UseGuards(JwtAuthGuard)
  likeTour(@Req() req: Request, @Param('id') tourId: string) {
    return this.tourService.likeTour(req?.user['sub'], tourId);
  }
}

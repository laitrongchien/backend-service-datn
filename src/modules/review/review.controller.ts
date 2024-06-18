import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewService } from './review.service';
import { ReviewTourDto } from './dto/review-tour.dto';
import { ReviewMotorbikeDto } from './dto/review-motorbike.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/get-reviews-by-tour/:id')
  async getReviewsByTour(
    @Param('id') tourId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.reviewService.getReviewsByTour(tourId, page, limit);
  }

  @Get('/get-reviews-by-motorbike/:id')
  async getReviewsByMotorbike(
    @Param('id') motorbikeId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.reviewService.getReviewsByMotorbike(motorbikeId, page, limit);
  }

  @Post('/create-review-tour')
  @UseGuards(JwtAuthGuard)
  async createReviewTour(@Body() createReviewTourData: ReviewTourDto) {
    return this.reviewService.createReviewTour(createReviewTourData);
  }

  @Post('/create-review-motorbike')
  @UseGuards(JwtAuthGuard)
  async createReviewMotorbike(
    @Body() createReviewMotorbikeData: ReviewMotorbikeDto,
  ) {
    return this.reviewService.createReviewMotorbike(createReviewMotorbikeData);
  }
}

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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { TourService } from './tour.service';
import { TourDto } from './dto/tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateSelfTourDto } from './dto/create-self-tour.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get('all')
  async findAllTours(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('userId') userId?: string,
    @Query('startLocation') startLocation?: string,
    @Query('minDuration') minDuration?: number,
    @Query('maxDuration') maxDuration?: number,
  ) {
    return this.tourService.getAllTours(
      page,
      limit,
      userId,
      startLocation,
      minDuration,
      maxDuration,
    );
  }

  @Get('all-self-tours')
  @UseGuards(JwtAuthGuard)
  async getAllSelfTours(@Req() req: Request) {
    return this.tourService.getAllSelfTours(req?.user['sub']);
  }

  @Get('/popular-tours')
  async findPopularTours() {
    return this.tourService.getPopularTours();
  }

  @Get('/favorite-tours')
  @UseGuards(JwtAuthGuard)
  getFavoriteTour(@Req() req: Request) {
    return this.tourService.getFavoriteTour(req.user['sub']);
  }

  @Get('/get-tour/:id')
  async findTourById(@Param('id') id: string) {
    return this.tourService.getTourById(id);
  }

  @Get('/get-self-tour/:id')
  async findSelfTourById(@Param('id') id: string) {
    return this.tourService.getSelfTourById(id);
  }

  @Post('/create-tour')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTour(@Body() createTourDto: TourDto) {
    return this.tourService.createTour(createTourDto);
  }

  @Post('/create-self-tour')
  @UseGuards(JwtAuthGuard)
  async createSelfTour(
    @Req() req: Request,
    @Body() createSelfTourDto: CreateSelfTourDto,
  ) {
    return this.tourService.createSelfTour(req?.user['sub'], createSelfTourDto);
  }

  @Put('/update-tour/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTourById(
    @Param('id') id: string,
    @Body() updateTourDto: TourDto,
  ) {
    return this.tourService.updateTour(id, updateTourDto);
  }

  @Delete('delete-tour/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteTourById(@Param('id') id: string) {
    return this.tourService.deleteTour(id);
  }

  @Post('like-tour/:id')
  @UseGuards(JwtAuthGuard)
  likeTour(@Req() req: Request, @Param('id') tourId: string) {
    return this.tourService.likeTour(req?.user['sub'], tourId);
  }

  @Post('unlike-tour/:id')
  @UseGuards(JwtAuthGuard)
  unlikeTour(@Req() req: Request, @Param('id') tourId: string) {
    return this.tourService.unlikeTour(req?.user['sub'], tourId);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('imageCover'))
  uploadTourImage(@UploadedFile() file: Express.Multer.File) {
    return this.tourService.uploadTourImage(file);
  }
}

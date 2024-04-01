import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Request } from 'express';
import { MotorbikeService } from './motorbike.service';
import { MotorbikeDto } from './dto/motorbike.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateRentalMotorbikeDto } from './dto/create-rental-motorbike.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';

@Controller('motorbike')
export class MotorbikeController {
  constructor(private readonly motorbikeService: MotorbikeService) {}

  @Get('/all')
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('userId') userId?: string,
    @Query('sort') sortField?: string,
    @Query('sortOrder') sortOrder?: number,
    @Query('type') type?: string,
  ) {
    const sortOptions = sortField ? { [sortField]: sortOrder || 1 } : {};
    const filterOptions = type ? { type } : {};
    return this.motorbikeService.getAllMotorbikes(
      filterOptions,
      sortOptions,
      page,
      limit,
      userId,
    );
  }

  @Get('/favorite-motorbikes')
  @UseGuards(JwtAuthGuard)
  getFavoriteMotorbike(@Req() req: Request) {
    return this.motorbikeService.getFavoriteMotorbike(req.user['sub']);
  }

  @Get('/get-motorbike/:id')
  async findOne(@Param('id') id: string) {
    return this.motorbikeService.getMotorbikeById(id);
  }

  @Post('/create-motorbike')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createMotorbikeDto: MotorbikeDto) {
    return this.motorbikeService.createMotorbike(createMotorbikeDto);
  }

  @Put('/update-motorbike/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMotorbikeDto: MotorbikeDto,
  ) {
    return this.motorbikeService.updateMotorbike(id, updateMotorbikeDto);
  }

  @Delete('delete-motorbike/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.motorbikeService.deleteMotorbike(id);
  }

  @Post('like-motorbike/:id')
  @UseGuards(JwtAuthGuard)
  likeMotorbike(@Req() req: Request, @Param('id') motorbikeId: string) {
    return this.motorbikeService.likeMotorbike(req?.user['sub'], motorbikeId);
  }

  @Post('unlike-motorbike/:id')
  @UseGuards(JwtAuthGuard)
  unlikeMotorbike(@Req() req: Request, @Param('id') motorbikeId: string) {
    return this.motorbikeService.unlikeMotorbike(req?.user['sub'], motorbikeId);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadTourImage(@UploadedFile() file: Express.Multer.File) {
    return this.motorbikeService.uploadMotorbikeImage(file);
  }

  @Post('create-rental')
  @UseGuards(JwtAuthGuard)
  rentMotorbike(
    @Req() req: Request,
    @Body() createRentalMotorbikeDto: CreateRentalMotorbikeDto,
  ) {
    return this.motorbikeService.createRentalMotorbike(
      req?.user['sub'],
      createRentalMotorbikeDto,
    );
  }

  @Get('get-all-rentals')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllRentals() {
    return this.motorbikeService.getAllMotorbikeRentals();
  }

  @Get('get-rentals-by-user')
  @UseGuards(JwtAuthGuard)
  getUserMotorbikeRentals(@Req() req: Request) {
    return this.motorbikeService.getMotorbikeRentalsByUser(req?.user['sub']);
  }

  @Get('get-rental-detail/:rentalId')
  @UseGuards(JwtAuthGuard)
  getMotorbikeRentalDetail(@Param('rentalId') rentalId: string) {
    return this.motorbikeService.getMotorbikeRentalDetail(rentalId);
  }

  @Put('/update-rental-status/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRentalStatus(
    @Param('id') id: string,
    @Body() updateRentalStatus: UpdateRentalStatusDto,
  ) {
    return this.motorbikeService.updateRentalStatus(id, updateRentalStatus);
  }

  @Put('/update-identifications-rental/:id')
  // @Roles('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateIdentificationsRental(
    @Param('id') id: string,
    @Body('identifications') identifications: string[],
  ) {
    return this.motorbikeService.updateIdentificationsRental(
      id,
      identifications,
    );
  }
}

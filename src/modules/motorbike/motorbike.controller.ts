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
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('motorbike')
export class MotorbikeController {
  constructor(private readonly motorbikeService: MotorbikeService) {}

  @Get('/all')
  async findAllMotorbikes(
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

  @Get('get-suggest-motorbikes')
  async getSuggestMotorbikes(@Query('distance') distance: number) {
    return this.motorbikeService.getSuggestMotorbikes(distance);
  }

  @Post('/create-motorbike')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createMotorbike(@Body() createMotorbikeDto: MotorbikeDto) {
    return this.motorbikeService.createMotorbike(createMotorbikeDto);
  }

  @Put('/update-motorbike/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateMotorbike(
    @Param('id') id: string,
    @Body() updateMotorbikeDto: MotorbikeDto,
  ) {
    return this.motorbikeService.updateMotorbike(id, updateMotorbikeDto);
  }

  @Delete('delete-motorbike/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteMotorbike(@Param('id') id: string) {
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
  uploadMotorbikeImage(@UploadedFile() file: Express.Multer.File) {
    return this.motorbikeService.uploadMotorbikeImage(file);
  }
}

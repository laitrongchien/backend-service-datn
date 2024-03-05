import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MotorBikeService } from './motorBike.service';
import { MotorBikeDto } from './dto/motorBike.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('motorbike')
export class MotorBikeController {
  constructor(private readonly motorBikeService: MotorBikeService) {}

  @Get()
  async findAll() {
    return this.motorBikeService.getAllMotorBikes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.motorBikeService.getMotorBikeById(id);
  }

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createMotorBikeDto: MotorBikeDto) {
    return this.motorBikeService.createMotorBike(createMotorBikeDto);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMotorBikeDto: MotorBikeDto,
  ) {
    return this.motorBikeService.updateMotorBike(id, updateMotorBikeDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.motorBikeService.deleteMotorBike(id);
  }
}

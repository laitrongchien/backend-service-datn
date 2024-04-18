import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { MotorIdentificationService } from './motorIdentification.service';
import { CreateMotorIdentificationDto } from './dto/create-motor-identification.dto';
import { UpdateMotorIdentificationDto } from './dto/update-motor-identification.dto';

@Controller('identification')
export class MotorIdentificationController {
  constructor(
    private readonly motorIdentificationService: MotorIdentificationService,
  ) {}

  @Get('all')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllMotorIdentifications() {
    return this.motorIdentificationService.getAllMotorIdentifications();
  }

  @Get('/get-motor-identification/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMotorIdentification(@Param('id') id: string) {
    return this.motorIdentificationService.getMotorIdentificationById(id);
  }

  @Get('/get-motor-by-identification/:identification')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMotorByIdentification(
    @Param('identification') identification: string,
  ) {
    return this.motorIdentificationService.getMotorByIdentification(
      identification,
    );
  }

  @Post('/create-motor-identification')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createMotorIdentification(
    @Body() createMotorIdentificationDto: CreateMotorIdentificationDto,
  ) {
    return this.motorIdentificationService.createMotorIdentification(
      createMotorIdentificationDto,
    );
  }

  @Put('/update-motor-identification')
  // @Roles('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateMotorByIdentification(
    @Body() updateMotorIdentificationData: UpdateMotorIdentificationDto,
  ) {
    return this.motorIdentificationService.updateMotorByIdentification(
      updateMotorIdentificationData,
    );
  }
}
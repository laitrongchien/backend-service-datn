import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { RentalService } from './rental.service';
import { CreateRentalMotorbikeDto } from './dto/create-rental-motorbike.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { UpdateExtraFeeDto } from './dto/update-extra-fee.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}
  @Post('create-rental')
  @UseGuards(JwtAuthGuard)
  createRentalMotorbike(
    @Req() req: Request,
    @Body() createRentalMotorbikeDto: CreateRentalMotorbikeDto,
  ) {
    return this.rentalService.createRentalMotorbike(
      req?.user['sub'],
      createRentalMotorbikeDto,
    );
  }

  @Get('get-all-rentals')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllRentals() {
    return this.rentalService.getAllMotorbikeRentals();
  }

  @Get('get-rentals-by-user')
  @UseGuards(JwtAuthGuard)
  getUserMotorbikeRentals(@Req() req: Request) {
    return this.rentalService.getMotorbikeRentalsByUser(req?.user['sub']);
  }

  @Get('get-rental-detail/:rentalId')
  @UseGuards(JwtAuthGuard)
  getMotorbikeRentalDetail(@Param('rentalId') rentalId: string) {
    return this.rentalService.getMotorbikeRentalDetail(rentalId);
  }

  @Put('/update-rental-status/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRentalStatus(
    @Param('id') id: string,
    @Body() updateRentalStatus: UpdateRentalStatusDto,
  ) {
    return this.rentalService.updateRentalStatus(id, updateRentalStatus);
  }

  @Put('/update-rental-extra-fee/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRentalExtraFee(
    @Param('id') id: string,
    @Body() updateExtraFeeData: UpdateExtraFeeDto,
  ) {
    return this.rentalService.updateExtraFee(id, updateExtraFeeData);
  }

  @Put('/update-identifications-rental/:id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateIdentificationsRental(
    @Param('id') id: string,
    @Body('identifications') identifications: string[],
  ) {
    return this.rentalService.updateIdentificationsRental(id, identifications);
  }
}

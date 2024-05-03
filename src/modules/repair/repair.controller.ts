import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateRepairMotorbikeDto } from './dto/create-repair-motorbike.dto';
import { RepairService } from './repair.service';

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}
  @Post('create-repair')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  createRepairMotorbike(
    @Body() createRepairMotorbikeData: CreateRepairMotorbikeDto,
  ) {
    return this.repairService.createRepairMotorbike(createRepairMotorbikeData);
  }

  @Get('get-all-repairs')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllRepairs() {
    return this.repairService.getAllRepairs();
  }
}

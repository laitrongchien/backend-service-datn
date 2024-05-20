import {
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllNotifications(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.notificationService.getAllNotifications(page, limit);
  }

  @Put('update-read-status/:id')
  @UseGuards(JwtAuthGuard)
  async updateReadStatus(
    @Param('id') id: string,
    @Body('isRead') isRead: boolean,
  ) {
    return this.notificationService.updateReadNotificationStatus(id, isRead);
  }

  @Post('mark-all-as-read')
  @UseGuards(JwtAuthGuard)
  async markAllAsRead() {
    return this.notificationService.markAllAsRead();
  }
}

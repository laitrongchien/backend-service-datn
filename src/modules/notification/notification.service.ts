import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../../schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  async sendNotification(createNotificationData: CreateNotificationDto) {
    const notification = new this.notificationModel(createNotificationData);
    return notification.save();
  }

  async updateReadNotificationStatus(notificationId: string, isRead: boolean) {
    return await this.notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead },
      { new: true },
    );
  }

  async markAllAsRead() {
    return await this.notificationModel.updateMany(
      { isRead: false },
      { isRead: true },
    );
  }

  async getAllNotifications(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const notifications = await this.notificationModel
      .find()
      .populate({ path: 'user', select: 'name avatar' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalNotifications = await this.notificationModel.countDocuments();
    const totalUnreadNotifications =
      await this.notificationModel.countDocuments({ isRead: false });
    const totalPages = Math.ceil(totalNotifications / limit);
    return { notifications, totalPages, totalUnreadNotifications };
  }
}

import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  notificationType: string;
}

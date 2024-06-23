import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsOptional()
  user: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  notificationType: string;
}

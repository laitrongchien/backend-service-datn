import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMotorIdentificationDto {
  @IsNotEmpty()
  @IsString()
  motorbike: string;

  @IsNotEmpty()
  @IsString()
  identification: string;
}

import { IsNotEmpty } from 'class-validator';

export class UpdateBookingTourStatusDto {
  @IsNotEmpty()
  status: string;
}

import { IsNotEmpty } from 'class-validator';

export class UpdateRentalStatusDto {
  @IsNotEmpty()
  status: string;
}

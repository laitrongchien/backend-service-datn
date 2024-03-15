import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create-payment-url')
  async createPaymentUrl(@Req() req: Request) {
    return await this.paymentService.createPaymentUrl(req);
    // res.redirect(vnpUrl);
  }
}

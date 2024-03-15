import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import * as crypto from 'crypto';
import * as querystring from 'qs';
import { paymentConstants } from './payment.constant';

@Injectable()
export class PaymentService {
  constructor() {}

  async createPaymentUrl(req: any): Promise<string> {
    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = paymentConstants.vnp_TmnCode;
    const secretKey = process.env.VNPAY_SECRETKEY;
    let vnpUrl = paymentConstants.vnp_Url;
    const returnUrl = paymentConstants.vnp_ReturnUrl;

    const date = new Date();

    const createDate = format(date, 'yyyyMMddHHmmss');
    const orderId = format(date, 'HHmmss');
    const amount = req.body.amount || 0;
    const bankCode = req.body.bankCode || '';

    const orderInfo = 'Thanh toan cho ma GD:' + orderId;
    const orderType = req.body.orderType || 'other';
    const locale = req.body.language || 'vn';

    const currCode = 'VND';

    const vnpParams: any = {};
    vnpParams['vnp_Version'] = '2.1.0';
    vnpParams['vnp_Command'] = 'pay';
    vnpParams['vnp_TmnCode'] = tmnCode;
    vnpParams['vnp_Locale'] = locale;
    vnpParams['vnp_CurrCode'] = currCode;
    vnpParams['vnp_TxnRef'] = orderId;
    vnpParams['vnp_OrderInfo'] = orderInfo;
    vnpParams['vnp_OrderType'] = orderType;
    vnpParams['vnp_Amount'] = amount * 100;
    vnpParams['vnp_ReturnUrl'] = returnUrl;
    vnpParams['vnp_IpAddr'] = ipAddr;
    vnpParams['vnp_CreateDate'] = createDate;
    if (bankCode !== '') {
      vnpParams['vnp_BankCode'] = bankCode;
    }

    const sortedParams = this.sortObject(vnpParams);

    const signData = querystring.stringify(sortedParams, { encode: false });

    // const signData = Object.keys(sortedParams)
    //   .map((key) => `${key}=${sortedParams[key]}`)
    //   .join('&');

    // console.log(signData, signedData);

    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams['vnp_SecureHash'] = signed;

    // const queryString = Object.keys(sortedParams)
    //   .map(
    //     (key) =>
    //       `${encodeURIComponent(key)}=${encodeURIComponent(sortedParams[key])}`,
    //   )
    //   .join('&');

    vnpUrl += '?' + querystring.stringify(sortedParams, { encode: false });

    return vnpUrl;
  }

  sortObject(obj: any) {
    const sorted = {};
    const str = [];
    let key: any;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}

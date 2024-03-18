export const paymentConstants = {
  vnp_TmnCode: 'QMPVL247',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_ReturnUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://vietnam-motorbike-tours.vercel.app/payment_result'
      : 'http://localhost:3000/payment_result',
};

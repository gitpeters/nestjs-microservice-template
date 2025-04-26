import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-create')
  sendNewOrderNotification(@Payload() order: any) {
    console.log(`Sending new order notification:`, order);
  }

  @MessagePattern('payment-succeed')
  sendPaymentSucceedNotification(@Payload() order: any) {
    console.log(`Sending payment confirmation notification:`, order);
  }
}

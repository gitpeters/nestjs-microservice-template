import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('orders')
  createOrder(@Body() order: any) {
    this.kafkaClient.emit('order-create', order);
    return { message: 'Order sent to kakfa', order };
  }
}

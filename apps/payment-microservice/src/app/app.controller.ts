import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('payment-process')
  handleOrderPaymentProcessing(@Payload() order: any) {
    console.log(`Processing payment for order: `, order);

    // Simulating successful payment
    this.kafkaClient.emit('payment-succeed', order);
  }
}

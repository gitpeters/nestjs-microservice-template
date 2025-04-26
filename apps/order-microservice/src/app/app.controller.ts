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

  @MessagePattern('order-create')
  handleOrderCreated(@Payload() order: any) {
    console.log(`[Order-Service]: Receive new order request:`, order);

    //Process order in order service. This is a test case, I'm simulating order processing
    this.kafkaClient.emit('payment-process', order)
  }
}

import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DELIVERY_SERVICE, NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';

@Controller('delivery')
export class DeliverysController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.client.send({ cmd: 'createDelivery' }, createDeliveryDto);
  }

  @Get()
  findAllDeliverys(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAllDeliverys' }, paginationDto)
  }


}

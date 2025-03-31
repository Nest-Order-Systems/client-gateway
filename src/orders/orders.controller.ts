import { Controller, Get, Post, Body, Param, Inject, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto).pipe(
          catchError(err => { throw new RpcException(err) })
        );
  }

  @Get()
  findAllOrders(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAllOrders' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'findOneOrder' }, { id });
  }

}

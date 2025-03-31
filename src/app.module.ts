import { Module } from '@nestjs/common';
import { InventorysModule } from './inventorys/inventorys.module';
import { OrdersModule } from './orders/orders.module';
import { DeliverysModule } from './deliverys/deliverys.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [InventorysModule, OrdersModule, DeliverysModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

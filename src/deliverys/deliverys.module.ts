import { Module } from '@nestjs/common';
import { DeliverysController } from './deliverys.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [DeliverysController],
  providers: [],
  imports: [NatsModule]
})
export class DeliverysModule { }

import { Module } from '@nestjs/common';
import { InventorysController } from './inventorys.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, INVENTORY_SERVICE } from 'src/config';

@Module({
  controllers: [InventorysController],
  providers: [],
  imports:[
    ClientsModule.register([
      { 
        name: INVENTORY_SERVICE, 
        transport: Transport.TCP,
        options:{
          host: envs.inventoryMicroserviceHost,
          port: envs.inventoryMicroservicePort,
        }
      },
    ]),
  ]
})
export class InventorysModule {}

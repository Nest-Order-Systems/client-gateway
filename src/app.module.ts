import { Module } from '@nestjs/common';
import { InventorysModule } from './inventorys/inventorys.module';

@Module({
  imports: [InventorysModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

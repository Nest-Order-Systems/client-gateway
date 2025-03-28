import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { INVENTORY_SERVICE } from 'src/config';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventorysController {
  constructor(
    @Inject(INVENTORY_SERVICE) private readonly inventoryClient: ClientProxy,
  ) { }

  @Post()
  createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryClient.send({ cmd: 'create_inventory' }, createInventoryDto)
  }

  @Get()
  findAllInventories(@Query() paginationDto: PaginationDto) {
    return this.inventoryClient.send({ cmd: 'find_all_inventory' }, paginationDto)
  }

  @Get(':id')
  async findOneInventories(@Param('id') id: string) {

    try {

      // it's an observable, if it does not generate an error it returns the product
      const product = await firstValueFrom(
        this.inventoryClient.send({ cmd: 'find_one_inventory' }, { id })
      );
      return product;

    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Delete(':id')
  deleteOneInventories(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryClient.send({ cmd: 'delete_inventory' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

  @Patch(':id')
  updateOneInventories(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryClient.send({ cmd: 'update_inventory' }, {
      id,
      ...updateInventoryDto
    }).pipe(
      catchError(err => { throw new RpcException(err) })
    )
  }

}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { FacturaDto } from './dto/factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getFacturas(): Promise<FacturaEntity[]> {
    return this.appService.getAll();
  }

  @Post()
  createFactura(@Body() factura: FacturaDto): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.appService.create(newFactura);
  }

  @Put(':id')
  updateFactura(@Param('id', ParseIntPipe) id: number, @Body() factura: FacturaDto): Promise<FacturaEntity> {
    const updatedFactura = new FacturaEntity(factura);
    return this.appService.update(id, updatedFactura);
  }

  // @Patch(':id')
  // updateParcialFactura(@Param('id', ParseIntPipe) id: number, @Body() factura: FacturaDto): Promise<FacturaEntity> {
  // }

  @Delete(':id')
  deleteFactura(@Param('id', ParseIntPipe) id: number): Promise<FacturaEntity> {
    return this.appService.delete(id);
  }

}

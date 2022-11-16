import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { AppService } from './app.service';
import { FacturaDto } from './dto/factura.dto';
import { PartialUpdateFacturaDto } from './dto/partial-update-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getFacturas(): Promise<FacturaEntity[]> {
    return this.appService.getAll();
  }

  @Get(':id')
  getFacturaById(@Param('id', ParseIntPipe) id: number): Promise<FacturaEntity> {
    return this.appService.getById(id);
  }

  @Post()
  createFactura(@Body(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),) factura: FacturaDto): Promise<FacturaEntity> {
    return this.appService.create(factura);
  }

  @Put(':id')
  updateFactura(
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    factura: UpdateFacturaDto,
  ): Promise<UpdateResult> {
    return this.appService.update(id, factura);
  }

  @Patch(':id')
  updateParcialFactura(@Param('id', ParseIntPipe) id: number, @Body(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),) factura: PartialUpdateFacturaDto): Promise<UpdateResult> {
    return this.appService.partialUpdate(id, factura)
  }

  @Delete(':id')
  deleteFactura(@Param('id', ParseIntPipe) id: number): Promise<FacturaEntity> {
    return this.appService.delete(id);
  }
}

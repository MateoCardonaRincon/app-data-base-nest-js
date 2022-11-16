import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { FacturaDetalleDto } from './factura-detalle.dto';

export class FacturaDto {

  @IsString()
  @IsNotEmpty()
  clienteNombre: string;

  @IsString()
  @IsOptional()
  clienteCorreo?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => FacturaDetalleDto)
  detalleFactura?: FacturaDetalleDto[];
}



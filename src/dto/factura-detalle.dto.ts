import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FacturaDetalleDto {
  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}

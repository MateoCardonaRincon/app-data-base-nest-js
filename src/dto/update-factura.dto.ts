import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateFacturaDto {
    @IsString()
    @IsNotEmpty()
    clienteNombre: string;

    @IsString()
    @IsOptional()
    clienteCorreo?: string;
}
import { PartialType } from "@nestjs/mapped-types";
import { UpdateFacturaDto } from "./update-factura.dto";

export class PartialUpdateFacturaDto extends PartialType(UpdateFacturaDto) { }
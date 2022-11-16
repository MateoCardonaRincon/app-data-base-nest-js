import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleFacturaEntity } from './detalle-factura.entity';
import { FacturaDto } from '../dto/factura.dto';

@Entity('tbl_factura', { schema: 'facturacion' })
export class FacturaEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'fac_id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'fac_cliente_nombre', length: 500 })
  clienteNombre: string;

  @Column('varchar', {
    name: 'fac_cliente_correo',
    nullable: true,
    length: 500,
  })
  clienteCorreo: string | null;

  @OneToMany(
    () => DetalleFacturaEntity,
    (detalleFacturaEntity) => detalleFacturaEntity.factura,
    { cascade: ['insert'], onDelete: 'RESTRICT', onUpdate: 'RESTRICT', eager: true },
  )
  detalleFactura: DetalleFacturaEntity[];
}

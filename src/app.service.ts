import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FacturaEntity } from './entities/factura.entity';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getAll(): Promise<FacturaEntity[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const facturas = await queryRunner.manager.find(FacturaEntity);
      await queryRunner.commitTransaction();
      return Promise.resolve(facturas);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para recuperando las factura',
        HttpStatus.CONFLICT,
      );
    }
  }

  async create(factura: FacturaEntity): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newFactura = await queryRunner.manager.save(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(newFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para insertar una factura',
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(id: number, factura: FacturaEntity): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const thisFactura = await queryRunner.manager.findOneByOrFail(FacturaEntity, { id });

      const updatedFactura = await queryRunner.manager.merge(FacturaEntity, thisFactura);

      console.log(thisFactura)
      await queryRunner.commitTransaction();
      return Promise.resolve(updatedFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'No se encontró la factura con id ${id}',
        HttpStatus.CONFLICT,
      );
    }
  }

  async delete(id: number): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const deleteThisFactura = await queryRunner.manager.findOneByOrFail(FacturaEntity, { id });
      const deletedFactura = await queryRunner.manager.remove(FacturaEntity, deleteThisFactura);
      await queryRunner.commitTransaction();
      return Promise.resolve(deletedFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `Tenemos problemas para eliminar la factura con id ${id}`,
        HttpStatus.CONFLICT,
      );
    }
  }
}

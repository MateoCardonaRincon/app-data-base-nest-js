import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, UpdateResult } from 'typeorm';
import { FacturaDto } from './dto/factura.dto';
import { PartialUpdateFacturaDto } from './dto/partial-update-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) { }

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

  async getById(id: number): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const factura = await queryRunner.manager.findOneByOrFail(FacturaEntity, { id });
      await queryRunner.commitTransaction();
      return Promise.resolve(factura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `Tenemos problemas para recuperar la factura con id ${id}`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async create(factura: FacturaDto): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newFactura = await queryRunner.manager.save(FacturaEntity, factura);
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

  async update(id: number, factura: UpdateFacturaDto): Promise<UpdateResult> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const updatedFactura = queryRunner.manager.update(FacturaEntity, { id }, factura);

      await queryRunner.commitTransaction();
      return updatedFactura;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `No se encontró la factura con id ${id}`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async partialUpdate(id: number, factura: PartialUpdateFacturaDto): Promise<UpdateResult> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const updatedFactura = queryRunner.manager.update(FacturaEntity, { id }, factura);

      await queryRunner.commitTransaction();
      return updatedFactura;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `No se encontró la factura con id ${id}`,
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
      console.log(deleteThisFactura)
      const removedFactura = await queryRunner.manager.remove(FacturaEntity, deleteThisFactura);
      await queryRunner.commitTransaction();
      console.log(removedFactura)
      return Promise.resolve(removedFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `No se pudo eliminar la factura con id ${id}, ya que no existe o tiene detalles relacionados`,
        HttpStatus.CONFLICT,
      );
    }
  }
}

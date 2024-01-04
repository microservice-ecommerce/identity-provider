import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseInterfaceRepository } from './base.interface';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: T | any): Promise<T> {
    return await this.entity.save(data);
  }

  public async findOneById(id: number): Promise<T> {
    const options: FindOneOptions = {
      where: {
        id,
      },
    };
    return await this.entity.findOne(options);
  }

  public async update(id: number, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.entity.update(id, data);
    const options: FindOneOptions = {
      where: {
        id,
      },
    };
    return await this.entity.findOne(options);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return await this.entity.findOne({ where: filterCondition });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(): Promise<T[]> {
    return await this.entity.find();
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async getTest(): Promise<string> {
    return 'asdasdas';
  }
}

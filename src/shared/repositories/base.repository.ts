import { BaseInterfaceRepository } from './base.interface';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(data: T | any): Promise<T> {
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

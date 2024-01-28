import { DataSource, DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseInterfaceRepository } from './base.interface';

export abstract class BaseAbstractRepository<T, M> implements BaseInterfaceRepository<T, M> {
  private entity: Repository<T>;
  private dataSource: DataSource;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: M | any): Promise<M> {
    let entity = this.toEntity(data);
    entity = await this.entity.save(entity);
    return this.toModel(entity);
  }

  public async findOneById(id: number): Promise<M | null> {
    const options: FindOneOptions = {
      where: {
        id,
      },
    };
    const entity = await this.entity.findOne(options);

    return entity ? this.toModel(entity) : null;
  }

  public async update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return await this.entity.update(id, data);
  }

  public async findByCondition(filterCondition: any): Promise<M> {
    const entity = await this.entity.findOne({ where: filterCondition });
    return entity ? this.toModel(entity) : null;
  }

  public async findWithRelations(relations: any): Promise<M[]> {
    let listEntity = await this.entity.find(relations);
    if(listEntity.length === 0) return [];
    return listEntity.map((entity) => this.toModel(entity));
  }

  public async findAll(): Promise<M[]> {
    let listEntity = await this.entity.find();
    if(listEntity.length === 0) return [];
    return listEntity.map((entity) => this.toModel(entity));  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async getTest(): Promise<string> {
    return 'asdasdas';
  }

  protected abstract toModel(entity: T): M;

  protected abstract toEntity(model: M): T;
}

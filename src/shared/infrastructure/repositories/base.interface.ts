import { DeleteResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseInterfaceRepository<T,M> {
  save(data: T | any): Promise<M>;

  findOneById(id: number): Promise<M | null>;

  findByCondition(filterCondition: any): Promise<M | null>;

  findAll(): Promise<M[]>;

  remove(id: string | number): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<M[]>;

  update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
}

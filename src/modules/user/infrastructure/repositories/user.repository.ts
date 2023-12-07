import { Injectable } from "@nestjs/common";
import { IUserPort } from "../../core/ports";
import { InjectRepository } from "@nestjs/typeorm";
import { USER_REPOSITORY } from "../../core/token";
import { Repository } from "typeorm";
import { UserEntity } from "../../core/entities";
import { BaseAbstractRepository } from "@high3ar/common-api";

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity> implements IUserPort{
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>
  ){
    super(_userRepository);
  }
  getAll(): string{
    return 'GET ALL USERS'
  }
}

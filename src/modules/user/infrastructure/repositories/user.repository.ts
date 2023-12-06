import { Injectable } from "@nestjs/common";
import { IUserPort } from "../../core/ports";
import { InjectRepository } from "@nestjs/typeorm";
import { USER_REPOSITORY } from "../../core/token";
import { Repository } from "typeorm";
import { UserEntity } from "../../core/entities";

@Injectable()
export class UserRepository implements IUserPort{
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>
  ){}
  getAll(): string{
    return 'GET ALL USERS'
  }
}

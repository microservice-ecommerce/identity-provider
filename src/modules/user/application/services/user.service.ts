import { H3Logger } from '@high3ar/common-api';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConvertUtil } from '@shared/utils/to-entity.util';
import { UserPayload, UserRequest, UserResponse } from '@user/core/dtos';
import { IUserUseCase } from '../../core/interfaces';
import { IAccountPort, IUserPort } from '../../core/ports';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from '../../core/token';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService implements IUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountPort,
  ) {}

  public getAll() {
    return this._userRepository.getAll();
  }

  @Transactional()
  public async save(request: UserRequest): Promise<UserPayload> {
    const { infoUser, account } = request;
    const isEmailExist = await this._accountRepository.findByEmail(account.email);
    if (isEmailExist) {
      H3Logger.error('Email already exists');
      throw new BadRequestException('Email already exists');
    }

    let accountEntity = ConvertUtil.toAccountEntity(account);
    accountEntity = await this._accountRepository.create(accountEntity);

    let InfoUserEntity = ConvertUtil.toInfoUserEntity(infoUser, accountEntity);
    InfoUserEntity = await this._userRepository.create(InfoUserEntity);

    return new UserPayload(InfoUserEntity, accountEntity);
  }

  @Transactional()
  public async findOneByEmail(email: string): Promise<UserPayload> {
    const account = await this._accountRepository.findByEmail(email);
    if (!account) {
      H3Logger.error('Email not exist');
      throw new BadRequestException('Email not exist');
    }
    return new UserPayload(account.user, account);
  }

  @Transactional()
  public async getOne(userId: number): Promise<UserResponse> {
    const listUser = await this._userRepository.getTest();
    console.log(listUser);
    const user = await this._userRepository.findOneById(userId);
    if (!user) {
      H3Logger.error('User not exist');
      throw new BadRequestException('User not exist');
    }
    return new UserResponse(user, user.account);
  }
}

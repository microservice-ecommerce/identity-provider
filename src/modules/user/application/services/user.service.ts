import { H3Logger } from '@high3ar/common-api';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConvertUtil } from '@shared/utils/to-entity.util';
import { InfoUserRequest, UserPayload, UserRequest, UserResponse } from '@user/core/dtos';
import { Transactional } from 'typeorm-transactional';
import { IUserUseCase } from '../../core/interfaces';
import { IAccountPort, IUserPort } from '../../core/ports';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from '../../core/token';

@Injectable()
export class UserService implements IUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountPort,
  ) {}

  @Transactional()
  public async save(request: UserRequest): Promise<UserPayload> {
    const { infoUser, account } = request;
    const isEmailExist = await this._accountRepository.findByEmail(account.email);
    if (isEmailExist) {
      H3Logger.error('Email already exists');
      throw new BadRequestException('Email already exists');
    }

    let accountEntity = ConvertUtil.toAccountEntity(account);
    accountEntity = await this._accountRepository.save(accountEntity);

    let InfoUserEntity = ConvertUtil.toInfoUserEntity(infoUser, accountEntity);
    InfoUserEntity = await this._userRepository.save(InfoUserEntity);

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
    const user = await this._userRepository.findOneById(userId);
    if (!user) {
      H3Logger.error('User not exist');
      throw new NotFoundException('User not exist');
    }
    return new UserResponse(user, user.account);
  }

  @Transactional()
  public async update(userId: number, request: InfoUserRequest): Promise<UserResponse> {
    const user = await this._userRepository.findOneById(userId);
    if (!user) {
      H3Logger.error('User not found');
      throw new BadRequestException('User not found');
    }

    user.update(request);

    await this._userRepository.save(user);

    return new UserResponse(user, user.account);
  }
}

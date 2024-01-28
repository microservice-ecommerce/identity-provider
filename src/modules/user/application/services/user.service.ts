import { H3Logger } from '@high3ar/common-api';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserUseCase } from '@user/domain/interfaces';
import { IAccountPort, IUserPort } from '@user/domain/ports';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from '@user/domain/token';
import { AccountRequest, InfoUserRequest, UserPayload, UserRequest, UserResponse } from '@user/domain/dtos';
import { Transactional } from 'typeorm-transactional';

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

    let accountModel = AccountRequest.toModel(account);
    console.log(accountModel)
    accountModel = await this._accountRepository.save(accountModel);

    let infoUserModel = InfoUserRequest.toModel(infoUser, accountModel);
    infoUserModel = await this._userRepository.save(infoUserModel);

    return new UserPayload(infoUserModel, accountModel);
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

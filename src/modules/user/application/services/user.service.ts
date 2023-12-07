import { H3Logger } from "@high3ar/common-api";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ConvertUtil } from "@shared/utils/to-entity.util";
import { UserRequest, UserResponse } from "@user/core/dtos";
import { IUserUseCase } from '../../core/interfaces';
import { IAccountPort, IUserPort } from "../../core/ports";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from "../../core/token";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class UserService implements IUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountPort
  ) {
  }
  public getAll() {
    return this._userRepository.getAll()
  }

  @Transactional()
  public async save(request: UserRequest): Promise<UserResponse> {
    const { infoUser, account } = request
    const isEmailExist = await this._accountRepository.findByEmail(account.email);
    if (isEmailExist) {
      H3Logger.error('Email already exists');
      throw new BadRequestException('Email already exists');
    }

    let accountEntity = ConvertUtil.toAccountEntity(account);
    accountEntity = await this._accountRepository.create(accountEntity);

    let userEntity = ConvertUtil.toUserEntity(infoUser, accountEntity);
    userEntity = await this._userRepository.create(userEntity);

    return new UserResponse(userEntity, accountEntity);
  }
}

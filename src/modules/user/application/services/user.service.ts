import { H3Logger } from "@high3ar/common-api";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRequest, UserResponse } from "@user/core/dtos";
import { IUserUseCase } from '../../core/interfaces';
import { IAccountPort, IUserPort } from "../../core/ports";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from "../../core/token";

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

  public async save(request: UserRequest): Promise<any> {
    const { infoUser, account } = request
    const email = this._accountRepository.findByEmail(account.email);
    if (email) {
      H3Logger.error('Email already exists');
      throw new BadRequestException('Email already exists');
    }


  }
}

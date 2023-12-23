import { UserRequest, UserResponse } from '@user/core/dtos';
import { LoginRequest, TokenResponse } from '../../dtos';
import { Request } from 'express';

export interface IAuthUseCase {
  login(req: Request, loginRequest: LoginRequest): Promise<TokenResponse>;
  register(request: UserRequest): Promise<UserResponse>;
  refreshToken(req: Request): Promise<TokenResponse>;
}

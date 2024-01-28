import { UserRequest, UserResponse } from '@user/domain/dtos';
import { LoginRequest, TokenResponse } from '../../dtos';
import { Request } from 'express';

export interface IAuthUseCase {
  login(req: Request, loginRequest: LoginRequest): Promise<TokenResponse>;
  register(request: UserRequest): Promise<UserResponse>;
  refreshToken(req: Request): Promise<TokenResponse>;
  logout(req: Request): Promise<void>;
}

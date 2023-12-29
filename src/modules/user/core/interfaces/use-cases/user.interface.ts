import { UserPayload, UserRequest, UserResponse } from '@user/core/dtos';

export interface IUserUseCase {
  getAll(): string;

  save(request: UserRequest): Promise<UserPayload>;

  findOneByEmail(email: string): Promise<UserPayload>;

  getOne(userId: number): Promise<UserResponse>;
}

import { InfoUserRequest, UserPayload, UserRequest, UserResponse } from '@user/core/dtos';

export interface IUserUseCase {
  save(request: UserRequest): Promise<UserPayload>;

  findOneByEmail(email: string): Promise<UserPayload>;

  getOne(userId: number): Promise<UserResponse>;

  update(id: number, request: InfoUserRequest): Promise<UserResponse>;
}

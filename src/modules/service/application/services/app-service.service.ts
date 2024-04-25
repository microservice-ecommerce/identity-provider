import { Inject, Injectable } from '@nestjs/common';
import { IServiceUseCase } from '@service/domain/interfaces';
import { IServicePort } from '@service/domain/ports';
import { APP_SERVICE_REPOSITORY } from '@service/domain/token';

@Injectable()
export class AppService implements IServiceUseCase {
  constructor(
    @Inject(APP_SERVICE_REPOSITORY)
    private readonly _appServiceRepository: IServicePort,
  ) {}
  save(request: any): Promise<any> {
    this._appServiceRepository.findAll();
    throw new Error('Method not implemented.');
  }
  getOne(serviceId: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: number, request: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

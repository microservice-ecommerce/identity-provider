import { Injectable } from '@nestjs/common';
import { IEmailUseCase } from '@shared/domain/interfaces';

@Injectable()
export class EmailService implements IEmailUseCase {
  sendEmailConfirmation(email: string, token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

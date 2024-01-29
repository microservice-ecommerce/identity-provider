
export interface IEmailUseCase {
  sendEmailConfirmation(email: string, token: string): Promise<void>;
}

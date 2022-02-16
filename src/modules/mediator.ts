import * as ValidateService from './validateService';

export class Mediator {
  private static instance: Mediator;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get Instance(): Mediator {
    return Mediator.instance || (Mediator.instance = new Mediator());
  }

  validateEmail(email: string): string | undefined {
    return ValidateService.validateEmail(email);
  }

  validatePassword(password: string): string | undefined {
    return ValidateService.validatePassword(password);
  }

  comparePasswords(password: string, newPassword: string): string | undefined {
    return ValidateService.comparePasswords(password, newPassword);
  }

  validatePhone(phone: string): string | undefined {
    return ValidateService.validatePhone(phone);
  }

  validateMessage(message: string): string | undefined {
    return ValidateService.validateMessage(message);
  }

  validateLogin(login: string): string | undefined {
    return ValidateService.validateLogin(login);
  }

  validateUserName(name: string): string | undefined {
    return ValidateService.validateUserName(name);
  }
}

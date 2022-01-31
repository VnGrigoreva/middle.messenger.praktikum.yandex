import * as ValidateService from "./validateService";

export class Mediator {
  private static instance: Mediator;
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor () {}

  public static get Instance(): Mediator {
    return Mediator.instance || (Mediator.instance = new Mediator()) 
  }

  //private validateService = new ValidateService();

  validateEmail(str: string): boolean {
    return ValidateService.validateEmail(str);
  }

  validatePassword(password: string, verifyPassword: string): boolean {
    return ValidateService.validatePassword(password, verifyPassword);
  }
}
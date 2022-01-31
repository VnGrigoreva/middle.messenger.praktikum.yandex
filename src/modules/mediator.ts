import * as ValidateService from "./validateService";

export class Mediator {
  private static instance: Mediator;
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor () {}

  public static get Instance(): Mediator {
    return Mediator.instance || (Mediator.instance = new Mediator()) 
  }

  validateEmail(email: string): boolean {
    return ValidateService.validateEmail(email);
  }

  validatePassword(password: string): boolean {
    return ValidateService.validatePassword(password);
  }
}
// export class ValidateService {

  export const validateEmail = (str: string): boolean =>{
    throw new Error('not implimented');
  }

  export const validatePassword = (password: string, verifyPassword: string): boolean =>{
    return password === verifyPassword;
  }
// }
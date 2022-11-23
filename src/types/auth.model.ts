export interface ISignUp {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export type ILogin = Pick<ISignUp, "email" | "password">;

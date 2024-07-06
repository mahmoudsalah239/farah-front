export interface AuthUserDTO {
  succeeded: boolean;
  email: string;
  role: string;
  message: string;
  token: string;
  errors: string[];
  fullName: string;
}

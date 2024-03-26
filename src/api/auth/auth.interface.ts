import type { UserRole } from '@/common/enums';

export interface IValidateUserParams {
  email: string;
  role: UserRole;
  password: string;
}

export interface IValidateJwtUserParams {
  email: string;
  role: UserRole;
  accessToken: string;
}

export interface ITokenPayload {
  email: string;
  role: UserRole;
}

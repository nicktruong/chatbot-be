import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AdminService } from '@/api/admin/admin.service';
import { CustomerService } from '@/api/customer/customer.service';

import { TokenService } from '@/api/token/token.service';

import type { Admin } from '@/api/admin/entities';
import type { Customer } from '@/api/customer/entities';

import {
  UserAlreadyException,
  WrongCredentialsException,
} from './auth.exceptions';

import type {
  RegisterDto,
  LoggedInDto,
  RefreshedDto,
  RegisteredDto,
} from './dto';

import type {
  ITokenPayload,
  IValidateUserParams,
  IValidateJwtUserParams,
} from './auth.interface';
import { UserRole } from '@/common/enums';
import { ILocalStrategy } from './strategies';

export type TUser = Admin | Customer;

@Injectable()
export class AuthService {
  services = {
    [UserRole[UserRole.ADMIN]]: this.adminService,
    [UserRole[UserRole.CUSTOMER]]: this.customerService,
  };

  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private customerService: CustomerService,
  ) {}

  public async register(userInfo: RegisterDto): Promise<RegisteredDto> {
    const services = {
      [UserRole[UserRole.CUSTOMER]]: this.customerService,
    };

    const userService = services[userInfo.role];

    const { email } = userInfo;

    const user = await userService.findOneByEmail(email);

    if (user) {
      throw new UserAlreadyException();
    }

    const registeredUser = await userService.create(userInfo);

    return registeredUser;
  }

  public async login(user: ILocalStrategy): Promise<LoggedInDto> {
    const { element, role } = user;

    const payload: ITokenPayload = {
      role,
      email: element?.email,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn:
        (this.configService.get('token.authentication.lifetime') / 1000) *
        this.configService.get('token.authentication.renewedTimes'), // access token will be only renewed n times with refresh token
    });

    await this.tokenService.create({
      accessToken,
      refreshToken,
      userRole: role,
      userId: element?.id,
    });

    return {
      accessToken,
      refreshToken,
      userInfo: element.toResponse(),
    };
  }

  public async validateUser({
    email,
    role,
    password,
  }: IValidateUserParams): Promise<TUser> {
    const userService = this.services[role];

    const user = await userService.findOneByEmail(email);

    if (!(user && compareSync(password, user?.password))) {
      throw new WrongCredentialsException();
    }

    return user;
  }

  public async validateJwtUser({
    email,
    role,
  }: IValidateJwtUserParams): Promise<TUser> {
    const userService = this.services[role];

    const user = await userService.findOneByEmail(email);

    if (!user) {
      throw new WrongCredentialsException();
    }

    return user;
  }

  public async refreshToken(refreshToken: string): Promise<RefreshedDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid Token');
    }

    const { role, email }: ITokenPayload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: this.configService.get('jwt.refreshSecret'),
      },
    );
    const userService = this.services[role];

    const user = await userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Token');
    }

    const payload = { role, email };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.secret'),
      expiresIn: this.configService.get('token.authentication.lifetime') / 1000,
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshSecret'),
      expiresIn:
        (this.configService.get('token.authentication.lifetime') / 1000) *
        this.configService.get('token.authentication.renewedTimes'), // access token will be only renewed n times with refresh token
    });

    await this.tokenService.create({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      userRole: payload.role,
      userId: user.id,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}

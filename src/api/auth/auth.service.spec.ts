import { Test } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

import { UserRole } from '@/common/enums';

import { RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ILocalStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { Customer } from '../customer/entities';
import { AuthService, TUser } from './auth.service';
import { CreatedCustomerDto } from '../customer/dto';
import { TokenService } from '../token/token.service';
import { UserAlreadyException } from './auth.exceptions';
import { CustomerService } from '../customer/customer.service';

describe('AuthController', () => {
  let authService: AuthService;
  let jwtService: DeepMocked<JwtService>;
  let tokenService: DeepMocked<TokenService>;
  let configService: DeepMocked<ConfigService>;
  let customerService: DeepMocked<CustomerService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(createMock)
      .compile();

    jwtService = module.get(JwtService);
    authService = module.get(AuthService);
    tokenService = module.get(TokenService);
    configService = module.get(ConfigService);
    customerService = module.get(CustomerService);
  });

  describe('register', () => {
    it('should register user with valid data', async () => {
      const registeredUser: CreatedCustomerDto = {
        id: '123',
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: UserRole.CUSTOMER,
        email: 'test@example.com',
      };

      customerService.findOneByEmail.mockResolvedValueOnce(null);
      customerService.create.mockResolvedValueOnce(registeredUser);

      const data: RegisterDto = {
        name: 'test',
        role: UserRole.CUSTOMER,
        password: 'testpassword',
        email: 'test@example.com',
      };

      const result = await authService.register(data);

      expect(result).toEqual(registeredUser);
    });

    it('should not register user again', async () => {
      const registeredUser: Omit<
        Customer,
        'toResponse' | 'toResponseHavingSessions'
      > = {
        id: '123',
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'testpassword',
        email: 'test@example.com',
      };

      customerService.findOneByEmail.mockResolvedValueOnce(
        registeredUser as Customer,
      );

      const data: RegisterDto = {
        name: 'test',
        role: UserRole.CUSTOMER,
        password: 'testpassword',
        email: 'test@example.com',
      };

      const result = authService.register(data);

      await expect(result).rejects.toBeInstanceOf(UserAlreadyException);
    });
  });

  describe('login', () => {
    it('should login user with correct data', async () => {
      configService.get
        .mockReturnValueOnce('refreshSecret')
        .mockReturnValueOnce('3600')
        .mockReturnValueOnce('3');

      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';

      jwtService.sign
        .mockReturnValueOnce(accessToken)
        .mockReturnValueOnce(refreshToken);

      const userInfo = {
        name: 'test',
        password: 'testpassword',
        email: 'test@example.com',
      };

      const user: ILocalStrategy = {
        element: {
          ...userInfo,
          toResponse: () => userInfo,
        } as unknown as TUser,
        role: UserRole.CUSTOMER,
      };

      const result = await authService.login(user);

      expect(result.userInfo).toEqual(userInfo);
      expect(result.accessToken).toBe(accessToken);
      expect(result.refreshToken).toBe(refreshToken);
      expect(tokenService.create).toHaveBeenCalled();
    });
  });
});

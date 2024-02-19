import { Test } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

import { UserRole } from '@/common/enums';

import { ILocalStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { AuthService, TUser } from './auth.service';
import { LoggedInDto, RegisterDto, RegisteredDto } from './dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: DeepMocked<AuthService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthController],
    })
      .useMocker(createMock)
      .compile();

    authService = module.get(AuthService);
    authController = module.get(AuthController);
  });

  describe('register', () => {
    it('should register user with valid data', async () => {
      const registeredUser: RegisteredDto = {
        id: '123',
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: UserRole.CUSTOMER,
        email: 'test@example.com',
      };

      authService.register.mockResolvedValueOnce(registeredUser);

      const data: RegisterDto = {
        name: 'test',
        role: UserRole.CUSTOMER,
        password: 'testpassword',
        email: 'test@example.com',
      };

      const result = await authController.register(data);

      expect(result).toEqual(registeredUser);
      expect(authService.register).toHaveBeenCalled();
      expect(authService.register.mock.calls[0][0]).toEqual(data);
    });
  });

  describe('login', () => {
    it('should login user with valid data', async () => {
      const loggedInUser: LoggedInDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        userInfo: {
          id: '123',
          name: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: UserRole.CUSTOMER,
          email: 'test@example.com',
        },
      };

      authService.login.mockResolvedValueOnce(loggedInUser);

      const data: ILocalStrategy = {
        element: {
          name: 'test',
          password: 'testpassword',
          email: 'test@example.com',
        } as TUser,
        role: UserRole.CUSTOMER,
      };

      const result = await authController.login(data);

      expect(result).toEqual(loggedInUser);
      expect(authService.login).toHaveBeenCalled();
      expect(authService.login.mock.calls[0][0]).toEqual(data);
    });
  });
});

import { Body, Headers } from '@nestjs/common';

import { InjectRoute, InjectController, ReqUser } from '@/decorators';

import authRoutes from './auth.routes';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto';

import { ILocalStrategy } from './strategies';
import type { LoggedInDto, RefreshedDto, RegisteredDto } from './dto';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @InjectRoute(authRoutes.register)
  public async register(@Body() userInfo: RegisterDto): Promise<RegisteredDto> {
    const registeredUser = await this.authService.register(userInfo);

    return registeredUser;
  }

  @InjectRoute(authRoutes.login)
  public async login(@ReqUser() user: ILocalStrategy): Promise<LoggedInDto> {
    const loggedInUser = await this.authService.login(user);

    return loggedInUser;
  }

  @InjectRoute(authRoutes.logout)
  public async logout(
    @Headers('Authorization') bearerToken: string,
    @ReqUser() user: ILocalStrategy,
  ): Promise<void> {
    await this.authService.logout({
      id: user.element.id,
      bearerToken,
    });
  }

  @InjectRoute(authRoutes.refreshToken)
  public async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<RefreshedDto> {
    const tokens = await this.authService.refreshToken(refreshToken);

    return tokens;
  }
}

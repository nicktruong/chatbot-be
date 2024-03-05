import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class UserAlreadyException extends BadRequestException {
  constructor() {
    super('User with that email already exists.');
  }
}

export class WrongCredentialsException extends UnauthorizedException {
  constructor() {
    super('Wrong credentials provided.');
  }
}

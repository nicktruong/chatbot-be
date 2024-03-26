import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Token } from './entities';
import { TokenRepository } from './token.repository';

import type { UserRole } from '@/common/enums';

import type { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: TokenRepository,
  ) {}

  public async create(tokenInfo: CreateTokenDto): Promise<Token> {
    const createdToken = this.tokenRepository.create(tokenInfo);

    await this.tokenRepository.save(createdToken);

    return createdToken;
  }

  public async getAllByUser({
    id,
    role,
  }: {
    id: string;
    role: UserRole;
  }): Promise<Token[]> {
    const sessions = await this.tokenRepository.findBy({
      userId: id,
      userRole: role,
    });

    return sessions;
  }

  public async checkTokenValid({
    id,
    accessToken,
  }: {
    id: string;
    accessToken: string;
  }) {
    const tokensLength = await this.tokenRepository.countBy({
      userId: id,
      accessToken,
    });

    return tokensLength > 0;
  }

  public async removeToken({
    id,
    accessToken,
  }: {
    id: string;
    accessToken: string;
  }) {
    await this.tokenRepository.delete({
      userId: id,
      accessToken,
    });
  }
}

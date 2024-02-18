import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { DeleteResult } from 'typeorm';

import { UserAlreadyException } from '@/api/auth/auth.exceptions';

import { Admin } from './entities';
import { Token } from '../token/entities';
import { AdminRepository } from './admin.repository';
import { TokenRepository } from '../token/token.repository';

import type {
  GotAdminDto,
  CreateAdminDto,
  UpdateAdminDto,
  CreatedAdminDto,
  GotAdminDetailDto,
} from './dto';
import { UserRole } from '@/common/enums';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: AdminRepository,
    @InjectRepository(Token)
    private tokenRepository: TokenRepository,
  ) {}

  public async create(data: CreateAdminDto): Promise<CreatedAdminDto> {
    const { email } = data;

    const admin = await this.findOneByEmail(email);
    if (admin) {
      throw new UserAlreadyException();
    }

    const createdAdmin = await this.adminRepository.create(data);

    await this.adminRepository.save(createdAdmin);

    return createdAdmin.toResponse();
  }

  public async findOneByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOneBy({ email });
  }

  public async getAll(): Promise<GotAdminDto[]> {
    const admins = await this.adminRepository.find();

    return admins.map((admin) => admin.toResponse());
  }

  public async getDetailById(id: string): Promise<GotAdminDetailDto> {
    const admin = await this.adminRepository.findOneBy({ id });

    const sessions = await this.tokenRepository.findBy({
      userId: id,
      userRole: UserRole.ADMIN,
    });

    return admin.toResponseHavingSessions(sessions);
  }

  private async handleUpdateAdmin({
    admin,
    data,
  }: {
    admin: Admin;
    data: UpdateAdminDto;
  }): Promise<Admin> {
    const updatedAdmin: Admin = admin;
    Object.assign(updatedAdmin, data);

    await this.adminRepository.update(
      {
        email: admin.email,
      },
      updatedAdmin,
    );

    return updatedAdmin;
  }

  public async updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateAdminDto;
  }): Promise<GotAdminDto> {
    const admin = await this.adminRepository.findOneBy({ id });

    const updatedAdmin = await this.handleUpdateAdmin({ admin, data });

    return updatedAdmin.toResponse();
  }

  public async updateByAdmin({
    admin,
    data,
  }: {
    admin: Admin;
    data: UpdateAdminDto;
  }): Promise<GotAdminDto> {
    const updatedAdmin = await this.handleUpdateAdmin({ admin, data });

    return updatedAdmin.toResponse();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.adminRepository.delete({ id });
  }
}

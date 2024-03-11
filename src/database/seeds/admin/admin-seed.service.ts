import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Admin } from '@/api/admin/entities';

@Injectable()
export class AdminSeedService {
  constructor(
    @InjectRepository(Admin) private repository: Repository<Admin>,
    private configService: ConfigService,
  ) {}

  async run() {
    const countAdmin = await this.repository.count();
    const admin: Admin = await this.configService.get('admin');

    if (!countAdmin) {
      await this.repository.save(this.repository.create(admin));
    }
  }
}

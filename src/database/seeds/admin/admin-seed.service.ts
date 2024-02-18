import { Admin } from '@/api/admin/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import type { Repository } from 'typeorm';

@Injectable()
export class AdminSeedService {
  constructor(@InjectRepository(Admin) private repository: Repository<Admin>) {}

  async run() {
    const countAdmin = await this.repository.count();

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          name: '<YOUR ADMIN NAME HERE>',
          email: '<YOUR ADMIN EMAIL HERE>',
          password: '<YOUR ADMIN PASSWORD HERE>',
        }),
      );
    }
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from '@/api/admin/entities';

import { AdminSeedService } from './admin-seed.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Admin])],
  providers: [AdminSeedService],
})
export class AdminSeedModule {}

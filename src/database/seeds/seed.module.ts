import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvSchema, configuration } from '@/config';

import { AdminSeedModule } from './admin/admin-seed.module';

@Module({
  imports: [
    AdminSeedModule,
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('db'),
    }),
  ],
})
export class SeedModule {}

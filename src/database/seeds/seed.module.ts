import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvSchema, configuration } from '@/config';

import { AdminSeedModule } from './admin/admin-seed.module';
import { FlowTypeSeedModule } from './flow-type/flow-type-seed.module';
import { NodeTypeSeedModule } from './node-type/node-type-seed.module';
import { FlowTypeNodeTypeSeedModule } from './flow-type-node-type/flow-type-node-type-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('db'),
    }),
    AdminSeedModule,
    FlowTypeSeedModule,
    NodeTypeSeedModule,
    FlowTypeNodeTypeSeedModule,
  ],
})
export class SeedModule {}

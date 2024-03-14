import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvSchema, configuration } from '@/config';

import { AdminSeedModule } from './admin/admin-seed.module';
import { CardTypeSeedModule } from './card-type/card-type-seed.module';
import { FlowTypeSeedModule } from './flow-type/flow-type-seed.module';
import { NodeTypeSeedModule } from './node-type/node-type-seed.module';
import { FieldTypeSeedModule } from './field-type/field-type-seed.module';
import { FlowTypeNodeTypeSeedModule } from './flow-type-node-type/flow-type-node-type-seed.module';
import { CardTypeFieldTypeSeedModule } from './card-type-field-type/card-type-field-type-seed.module';

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
    CardTypeSeedModule,
    FlowTypeSeedModule,
    NodeTypeSeedModule,
    FieldTypeSeedModule,
    FlowTypeNodeTypeSeedModule,
    CardTypeFieldTypeSeedModule,
  ],
})
export class SeedModule {}

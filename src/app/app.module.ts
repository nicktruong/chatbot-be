import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { BotModule } from '@/api/bot/bot.module';
import { AuthModule } from '@/api/auth/auth.module';
import { configuration, EnvSchema } from '@/config';
import { TokenModule } from '@/api/token/token.module';
import { AdminModule } from '@/api/admin/admin.module';
import { DatabaseModule } from '@/database/database.module';
import { CustomerModule } from '@/api/customer/customer.module';
import { FlowTypeModule } from '@/api/flow-type/flow-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [configuration],
    }),
    BotModule,
    AuthModule,
    TokenModule,
    AdminModule,
    CustomerModule,
    DatabaseModule,
    FlowTypeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

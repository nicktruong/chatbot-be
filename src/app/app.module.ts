import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { BotModule } from '@/api/bot/bot.module';
import { AuthModule } from '@/api/auth/auth.module';
import { CardModule } from '@/api/card/card.module';
import { EdgeModule } from '@/api/edge/edge.module';
import { FlowModule } from '@/api/flow/flow.module';
import { NodeModule } from '@/api/node/node.module';
import { ChatModule } from '@/api/chat/chat.module';
import { configuration, EnvSchema } from '@/config';
import { TokenModule } from '@/api/token/token.module';
import { AdminModule } from '@/api/admin/admin.module';
import { DatabaseModule } from '@/database/database.module';
import { CustomerModule } from '@/api/customer/customer.module';
import { CardTypeModule } from '@/api/card-type/card-type.module';
import { FlowTypeModule } from '@/api/flow-type/flow-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvSchema,
      load: [configuration],
    }),
    BotModule,
    AuthModule,
    CardModule,
    EdgeModule,
    FlowModule,
    NodeModule,
    ChatModule,
    TokenModule,
    AdminModule,
    CustomerModule,
    DatabaseModule,
    CardTypeModule,
    FlowTypeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

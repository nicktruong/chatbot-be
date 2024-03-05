import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { AdminSeedService } from './admin/admin-seed.service';
import { CardTypeSeedService } from './card-type/card-type-seed.service';
import { FlowTypeSeedService } from './flow-type/flow-type-seed.service';
import { NodeTypeSeedService } from './node-type/node-type-seed.service';
import { FlowTypeNodeTypeSeedService } from './flow-type-node-type/flow-type-node-type-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();
  await app.get(CardTypeSeedService).run();
  await app.get(FlowTypeSeedService).run();
  await app.get(NodeTypeSeedService).run();
  await app.get(FlowTypeNodeTypeSeedService).run();

  app.close();
};

runSeed();

import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { AdminSeedService } from './admin/admin-seed.service';
import { FlowTypeSeedService } from './flow-type/flow-type-seed.service';
import { NodeTypeSeedService } from './node-type/node-type-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();
  await app.get(FlowTypeSeedService).run();
  await app.get(NodeTypeSeedService).run();

  app.close();
};

runSeed();

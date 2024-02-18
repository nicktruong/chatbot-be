import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { AdminSeedService } from './admin/admin-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(AdminSeedService).run();

  app.close();
};

runSeed();

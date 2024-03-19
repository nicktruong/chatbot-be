import { NlpManager } from 'node-nlp';

import { Injectable } from '@nestjs/common';

const manager = new NlpManager({ languages: ['en'] });

@Injectable()
export class NlpService {
  async extractEntity(value: string) {
    const result = await manager.extractEntities('en', value);
    return result.entities[0]?.resolution.value;
  }
}

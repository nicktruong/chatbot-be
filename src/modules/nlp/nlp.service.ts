import { NlpManager } from 'node-nlp';

import { Injectable } from '@nestjs/common';

const defaultLng = 'en';

const manager = new NlpManager({ languages: [defaultLng] });

@Injectable()
export class NlpService {
  async extractEntity(value: string) {
    const result = await manager.extractEntities(defaultLng, value);
    return result.entities[0]?.resolution.value;
  }
}

import { Exclude, Expose } from 'class-transformer';

import { ActionedBaseDto } from '@/common/dto';

@Exclude()
export class GotBotDto extends ActionedBaseDto {
  @Expose()
  name: string;

  @Expose()
  publishDate: Date;
}

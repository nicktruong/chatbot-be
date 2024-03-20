import { Exclude, Expose } from 'class-transformer';

import { ActionedBaseDto } from '@/common/dto';

@Exclude()
export class CreatedBotDto extends ActionedBaseDto {
  @Expose()
  name: string;

  @Expose()
  publishDate: Date;
}

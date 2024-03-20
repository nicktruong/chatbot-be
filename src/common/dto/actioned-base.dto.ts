import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ActionedBaseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty({ format: 'date-time' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ format: 'date-time' })
  updatedAt: Date;
}

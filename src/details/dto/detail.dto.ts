import { ApiProperty } from '@nestjs/swagger';

export class DetailDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  partNumber: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(partial: Partial<DetailDto>) {
    Object.assign(this, partial);
  }
}

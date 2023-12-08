import { ApiPropertyOptional } from '@nestjs/swagger';

export class DetailDto {
  @ApiPropertyOptional()
  name: string | null;

  @ApiPropertyOptional()
  partNumber: string | null;

  constructor(partial: Partial<DetailDto>) {
    Object.assign(this, partial);
  }
}

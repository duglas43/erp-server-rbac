import { ApiProperty } from '@nestjs/swagger';

export class ParamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  unit: string | null;

  @ApiProperty()
  type: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: Partial<ParamDto>) {
    Object.assign(this, model);
  }
}

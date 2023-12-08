import { ApiProperty } from '@nestjs/swagger';

export class MachineDto {
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

  constructor(partial: Partial<MachineDto>) {
    Object.assign(this, partial);
  }
}

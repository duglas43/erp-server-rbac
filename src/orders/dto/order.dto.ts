import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  addressId: number;

  @ApiProperty()
  responsibleId: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  comment: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: Partial<OrderDto>) {
    Object.assign(this, model);
  }
}

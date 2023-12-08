import { ApiProperty } from '@nestjs/swagger';
export { ApiListResponse } from './apiListResponse.dto';
export { ListResponseDto, MetaDto } from './listResponse.dto';
export enum ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LANGUAGES } from '../enums';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ uniqueItems: true })
  login: string;

  @ApiPropertyOptional({ nullable: true })
  firstName: string | null;

  @ApiPropertyOptional({ nullable: true })
  lastName: string | null;

  @ApiPropertyOptional({ nullable: true })
  patronymic: string | null;

  @ApiProperty({ enum: LANGUAGES })
  language: LANGUAGES;

  @ApiPropertyOptional({ nullable: true })
  email: string | null;

  @ApiPropertyOptional()
  lastVisit: string | null;

  @ApiPropertyOptional()
  filialId: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: any) {
    this.id = model?.id;
    this.login = model?.login;
    this.firstName = model?.firstName;
    this.lastName = model?.lastName;
    this.patronymic = model?.patronymic;
    this.language = model?.language;
    this.email = model?.email;
    this.lastVisit = model?.lastVisit;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}

import {
  IsEmail,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsInt,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LANGUAGES } from '../enums';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  login: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patronymic: string | null;

  @ApiPropertyOptional({ enum: LANGUAGES })
  @IsOptional()
  @IsEnum(LANGUAGES)
  language: LANGUAGES;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone: string | null;

  @ApiPropertyOptional({})
  @IsOptional()
  @Transform(({ value }) => value?.map((id) => parseInt(id)) || null)
  @IsInt({ each: true })
  roleIds: number[] | null;
}

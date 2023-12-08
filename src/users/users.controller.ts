import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, FindUserDto } from './dto/';
import { UserDto } from './dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { RolesAllowed } from 'src/roles/decorator';
import { GetUser } from 'src/auth/decorator';
import { RolesGuard } from 'src/roles/guard';
import { PREDEFINE_ROLES } from 'src/roles/enums';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RolesAllowed([PREDEFINE_ROLES.ADMIN])
  @ApiCreatedResponse({ type: UserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return data;
  }

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  findMe(@GetUser() user: UserDto) {
    return new UserDto(user);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.usersService.update(id, updateUserDto);
    return data;
  }

  @Delete(':id')
  @RolesAllowed([PREDEFINE_ROLES.ADMIN])
  @ApiOkResponse({ type: UserDto })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.remove(id);
    return data;
  }

  @Post('/:id/roles')
  @RolesAllowed([PREDEFINE_ROLES.ADMIN])
  @ApiBody({
    schema: {
      properties: {
        roleIds: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: UserDto })
  async addRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roleIds', ParseIntPipe) roleIds: number[],
  ) {
    const data = await this.usersService.addRoles(id, roleIds);
    return data;
  }

  @Delete('/:id/roles')
  @RolesAllowed([PREDEFINE_ROLES.ADMIN])
  @ApiBody({
    schema: {
      properties: {
        roleIds: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: UserDto })
  async removeRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roleIds', ParseIntPipe) roleIds: number[],
  ) {
    const data = await this.usersService.removeRoles(id, roleIds);
    return data;
  }
}

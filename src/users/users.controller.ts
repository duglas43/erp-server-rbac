import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, FindUserDto } from './dto/';
import { UserDto } from './dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CustomApiUnauthorizedResponse,
  CustomApiForbiddenResponse,
  CustomApiNotFoundResponse,
} from 'src/types';
import { GetUser } from 'src/auth/decorator';
import { RolesAllowed } from 'src/roles/decorator';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@CustomApiForbiddenResponse()
@CustomApiNotFoundResponse()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('/:id/roles')
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
  addRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roleIds', ParseIntPipe) roleIds: number[],
  ) {
    return this.usersService.addRoles(id, roleIds);
  }

  @Delete('/:id/roles')
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
  removeRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roleIds', ParseIntPipe) roleIds: number[],
  ) {
    return this.usersService.removeRoles(id, roleIds);
  }
}

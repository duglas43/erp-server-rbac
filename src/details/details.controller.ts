import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import {
  CreateDetailDto,
  UpdateDetailDto,
  DetailDto,
  FindDetailDto,
} from './dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  CustomApiUnauthorizedResponse,
  CustomApiForbiddenResponse,
  CustomApiNotFoundResponse,
} from 'src/types';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@CustomApiForbiddenResponse()
@CustomApiNotFoundResponse()
@ApiTags('details')
@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  @ApiCreatedResponse({ type: DetailDto })
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get()
  @ApiOkResponse({ type: DetailDto, isArray: true })
  findAll(@Query() findDetailDto: FindDetailDto) {
    return this.detailsService.findAll(findDetailDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: DetailDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detailsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DetailDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetailDto: UpdateDetailDto,
  ) {
    return this.detailsService.update(id, updateDetailDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DetailDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detailsService.remove(id);
  }

  @Post(':id/param')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        paramId: { type: 'integer' },
        value: { type: 'string' },
      },
    },
  })
  @ApiOkResponse()
  addParam(
    @Param('id', ParseIntPipe) id: number,
    @Body('paramId', ParseIntPipe) paramId: number,
    @Body() value: string,
  ) {
    return this.detailsService.addParam(id, { paramId, value });
  }

  @Delete(':id/param/:paramId')
  @ApiOkResponse()
  removeParam(
    @Param('id', ParseIntPipe) id: number,
    @Param('paramId', ParseIntPipe) paramId: number,
  ) {
    return this.detailsService.removeParam(id, paramId);
  }
}

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
}

import { Injectable } from '@nestjs/common';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamDto } from './dto/update-param.dto';

@Injectable()
export class ParamsService {
  create(createParamDto: CreateParamDto) {
    return 'This action adds a new param';
  }

  findAll() {
    return `This action returns all params`;
  }

  findOne(id: number) {
    return `This action returns a #${id} param`;
  }

  update(id: number, updateParamDto: UpdateParamDto) {
    return `This action updates a #${id} param`;
  }

  remove(id: number) {
    return `This action removes a #${id} param`;
  }
}

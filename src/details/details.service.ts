import { Injectable } from '@nestjs/common';
import {
  CreateDetailDto,
  UpdateDetailDto,
  DetailDto,
  FindDetailDto,
} from './dto';
import { DetailEntity } from './entities/detail.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(DetailEntity)
    private detailEntity: typeof DetailEntity,
  ) {}

  async create(dto: CreateDetailDto) {
    const detail = await this.detailEntity.create({ ...dto });
    return new DetailDto(detail);
  }

  async findAll(dto: FindDetailDto) {
    const details = await this.detailEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { partNumber: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return details.map((detail) => new DetailDto(detail));
  }

  async findOne(id: number) {
    const detail = await this.detailEntity.findByPk(id);
    return new DetailDto(detail);
  }

  async update(id: number, dto: UpdateDetailDto) {
    const detail = await this.detailEntity.findByPk(id);
    await this.detailEntity.update(dto, { where: { id } });
    return new DetailDto(detail);
  }

  async remove(id: number) {
    const detail = await this.detailEntity.findByPk(id);
    await detail.destroy();
    return new DetailDto(detail);
  }

  async addParam(
    id: number,
    { paramId, value }: { paramId: number; value: string },
  ) {
    const detail = await this.detailEntity.findByPk(id);
    await detail.$add('params', paramId, { through: { value } });
    return new DetailDto(detail);
  }

  async removeParam(id: number, paramId: number) {
    const detail = await this.detailEntity.findByPk(id);
    await detail.$remove('params', paramId);
    return new DetailDto(detail);
  }
}

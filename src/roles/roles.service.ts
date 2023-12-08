import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto, RoleDto, FindRoleDto } from './dto';
import { RoleEntity } from './entities/role.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleEntity)
    private roleEntity: typeof RoleEntity,
  ) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleEntity.create({ ...dto });
    return new RoleDto(role);
  }

  async findAll(dto: FindRoleDto) {
    const roles = await this.roleEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { description: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return roles.map((role) => new RoleDto(role));
  }

  async findOne(id: number) {
    const role = await this.roleEntity.findByPk(id);
    return new RoleDto(role);
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.roleEntity.findByPk(id);
    await this.roleEntity.update(dto, { where: { id } });
    return new RoleDto(role);
  }

  async remove(id: number) {
    const role = await this.roleEntity.findByPk(id);
    await role.destroy();
    return new RoleDto(role);
  }
}

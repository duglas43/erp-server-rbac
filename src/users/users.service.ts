import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto, FindUserDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity)
    private userEntity: typeof UserEntity,
  ) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userEntity.create({
      ...dto,
      passwordHash,
    });
    if (dto.roleIds) {
      await createdUser.$set('roles', dto.roleIds);
    }
    const user = await this.userEntity.findByPk(createdUser.id, {});
    return new UserDto(user);
  }

  async findAll(dto: FindUserDto) {
    const users = await this.userEntity.findAll({
      where: {
        [Op.and]: [
          dto.query && {
            [Op.or]: [
              { firstName: { [Op.like]: `%${dto.query}%` } },
              { lastName: { [Op.like]: `%${dto.query}%` } },
              { patronymic: { [Op.like]: `%${dto.query}%` } },
            ],
          },
        ].filter(Boolean),
      },
    });
    return users.map((user) => new UserDto(user));
  }

  async findOne(id: number) {
    const user = await this.userEntity.findByPk(id);
    return new UserDto(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (dto.roleIds) {
      await user.$set('roles', dto.roleIds);
    }
    await this.userEntity.update(dto, { where: { id } });
    return new UserDto(user);
  }

  async remove(id: number) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.destroy();
    return new UserDto(user);
  }

  async getMe(id: number) {
    const user = await this.userEntity.findByPk(id, {});
    return new UserDto(user);
  }
  async addRoles(id: number, roleIds: number[]) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.$set('roles', roleIds);
    return new UserDto(user);
  }

  async removeRoles(id: number, roleIds: number[]) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.$remove('roles', roleIds);
    return new UserDto(user);
  }
}

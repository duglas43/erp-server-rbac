import { Injectable } from '@nestjs/common';
import {
  CreateMachineDto,
  UpdateMachineDto,
  FindMachineDto,
  MachineDto,
} from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { MachineEntity } from './entities/machine.entity';
import { Op } from 'sequelize';

@Injectable()
export class MachinesService {
  constructor(
    @InjectModel(MachineEntity)
    private machineEntity: typeof MachineEntity,
  ) {}
  async create(dto: CreateMachineDto) {
    const machine = await this.machineEntity.create({ ...dto });
    return new MachineDto(machine);
  }

  async findAll(dto: FindMachineDto) {
    const machines = await this.machineEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { partNumber: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return machines.map((machine) => new MachineDto(machine));
  }

  async findOne(id: number) {
    const machine = await this.machineEntity.findByPk(id);
    return new MachineDto(machine);
  }

  async update(id: number, dto: UpdateMachineDto) {
    const machine = await this.machineEntity.findByPk(id);
    await this.machineEntity.update(dto, { where: { id } });
    return new MachineDto(machine);
  }

  async remove(id: number) {
    const machine = await this.machineEntity.findByPk(id);
    await machine.destroy();
    return new MachineDto(machine);
  }
}

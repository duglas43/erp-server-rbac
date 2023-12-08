import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineEntity } from './entities/machine.entity';

@Module({
  imports: [SequelizeModule.forFeature([MachineEntity])],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}

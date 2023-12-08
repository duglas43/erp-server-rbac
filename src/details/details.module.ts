import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DetailEntity } from './entities/detail.entity';

@Module({
  imports: [SequelizeModule.forFeature([DetailEntity])],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}

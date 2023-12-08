import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';

@Module({
  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}

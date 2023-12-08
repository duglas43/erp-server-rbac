import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DetailsModule } from './details/details.module';
import { MachinesModule } from './machines/machines.module';
import { ParamsModule } from './params/params.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './users/entities/user.entity';
import { RoleEntity } from './roles/entities/role.entity';
import { UserRoleEntity } from './users/entities';
import { DetailEntity } from './details/entities/detail.entity';
import { MachineEntity } from './machines/entities/machine.entity';
import { MachineDetailEntity } from './machines/entities/machine-detail.entity';
import { ParamEntity } from './params/entities/param.entity';
import { DetailParamEntity } from './details/entities/detail-param.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    DetailsModule,
    MachinesModule,
    ParamsModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS || null,
      database: process.env.DB_NAME,
      define: {
        freezeTableName: true,
      },
      models: [
        UserEntity,
        RoleEntity,
        UserRoleEntity,
        DetailEntity,
        MachineEntity,
        MachineDetailEntity,
        ParamEntity,
        DetailParamEntity,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

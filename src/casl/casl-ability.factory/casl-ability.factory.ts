import { Injectable } from '@nestjs/common';
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';
import { ROLES } from 'src/roles/enums';
import { UserEntity } from 'src/users/entities';
import { OrderEntity } from 'src/orders/entities';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { AddressEntity } from 'src/addresses/entities';
import { MachineEntity } from 'src/machines/entities';
import { DetailEntity } from 'src/details/entities';
import { ParamEntity } from 'src/params/entities/param.entity';
import { DetailParamEntity } from 'src/details/entities';
import { OrderMachineEntity } from 'src/orders/entities/orderMachine.entity';
import { MachineDetailEntity } from 'src/machines/entities';
import { UserRoleEntity } from 'src/users/entities';
import { ACTIONS } from '../enums';

type Subjects =
  | InferSubjects<
      | typeof UserEntity
      | typeof OrderEntity
      | typeof RoleEntity
      | typeof AddressEntity
      | typeof MachineEntity
      | typeof DetailEntity
      | typeof ParamEntity
      | typeof DetailParamEntity
      | typeof OrderMachineEntity
      | typeof MachineDetailEntity
      | typeof UserRoleEntity
    >
  | 'all';

export type AppAbility = MongoAbility<[ACTIONS, any]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    user.roles.forEach((role) => {
      switch (role.name) {
        case ROLES.ADMIN:
          can(ACTIONS.MANAGE, 'all');
        case ROLES.ENGINEER:
          // Могут выполнять любые операции со своим аккаунтом - не возможно реализовать в ролевой модели
          can(ACTIONS.MANAGE, UserEntity); // Вместо этого разрешаем выполнять любые операции с пользователями
          can(ACTIONS.MANAGE, DetailEntity);
          can(ACTIONS.MANAGE, ParamEntity);
          can(ACTIONS.MANAGE, DetailParamEntity);
          can(ACTIONS.MANAGE, MachineEntity);
          can(ACTIONS.MANAGE, MachineDetailEntity);
        case ROLES.CLIENT:
          // Могут выполнять любые операции со своим аккаунтом - не возможно реализовать в ролевой модели
          can(ACTIONS.MANAGE, UserEntity); // Вместо этого разрешаем выполнять любые операции с пользователями
          // Могут выполнять любые операции со своими адресами - не возможно реализовать в ролевой модели
          can(ACTIONS.MANAGE, AddressEntity); // Вместо этого разрешаем выполнять любые операции с адресами
          can(ACTIONS.CREATE, OrderEntity);
          // Могут просматривать свои заказы - не возможно реализовать в ролевой модели
          can(ACTIONS.READ, OrderEntity); // Вместо этого разрешаем просматривать, создавать, обновлять и удалять заказы
          can(ACTIONS.UPDATE, OrderEntity);
          can(ACTIONS.DELETE, OrderEntity);
          can(ACTIONS.READ, MachineEntity);
          can(ACTIONS.READ, DetailEntity);
          can(ACTIONS.READ, ParamEntity);
          break;
        case ROLES.HR:
          can(ACTIONS.MANAGE, UserEntity); // Может управлять всеми пользователями
          cannot(ACTIONS.READ, UserEntity, { id: 1 }); // Не может управлять пользователем с id === 1 - админом
          break;
        case ROLES.MANAGER:
          // Могут выполнять любые операции со своим аккаунтом - не возможно реализовать в ролевой модели
          can(ACTIONS.MANAGE, UserEntity); // Вместо этого разрешаем выполнять любые операции с пользователями
          can(ACTIONS.CREATE, OrderEntity);
          can(ACTIONS.READ, OrderEntity);
          can(ACTIONS.UPDATE, OrderEntity, [
            'statusCode',
            'responsibleId',
            'totalPrice',
          ]);
          // if (new Date().getMinutes() < 40) {
          //   can(ACTIONS.DELETE, OrderEntity);
          // } - Запись не соответствует ролевой модели
          can(ACTIONS.DELETE, OrderEntity); // Вместо этого разрешаем удалять заказы
          can(ACTIONS.CREATE, MachineEntity);
          can(ACTIONS.READ, DetailEntity);
          can(ACTIONS.READ, ParamEntity);
          break;
      }
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

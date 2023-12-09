import { Injectable } from '@nestjs/common';
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';
import { UserEntity } from 'src/users/entities';
import { Actions } from '../enums';

class BlogPost {
  authorId: string;
  content: string;
  title: string;
}
type Subjects = InferSubjects<typeof UserEntity> | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    if (user) {
      can(Actions.MANAGE, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

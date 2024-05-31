import { Model, ModelObject } from 'objection';
import { EnumRoleUser } from '../enums/role-user-enum.js';
import { CarModel } from './CarModel.js';
import { SoftDeleteQueryBuilder } from 'objection-js-soft-delete';

export class UserModel extends Model {
  id!: string;
  username!: string;
  password!: string;
  name!: string;
  role!: EnumRoleUser;
  created_at!: Date;
  updated_at!: Date;

  static tableName = 'users';

  static get relationMappings() {
    return {
      cars: {
        relation: Model.HasManyRelation,
        modelClass: CarModel,
        join: {
          from: 'users.id',
          to: 'cars.created_by'
        },
        filter: (f: SoftDeleteQueryBuilder<CarModel>) => f.whereNotDeleted()
      }
    };
  }
}

export type User = ModelObject<UserModel>;

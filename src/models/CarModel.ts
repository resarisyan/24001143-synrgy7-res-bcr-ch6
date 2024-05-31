import { Model, ModelObject } from 'objection';
import { UserModel } from './UserModel';
import { SoftDeleteModel } from './base/SoftDeleteModel';

export class CarModel extends SoftDeleteModel {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  transmission!: string;
  year!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date | null;
  created_by!: string;
  updated_by!: string;
  deleted_by!: string;
  createdBy!: UserModel;
  updatedBy!: UserModel;
  deletedBy!: UserModel;

  static tableName = 'cars';

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.created_by',
          to: 'users.id'
        }
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.updated_by',
          to: 'users.id'
        }
      },
      deletedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.deleted_by',
          to: 'users.id'
        }
      }
    };
  }
}

export type Car = ModelObject<CarModel>;

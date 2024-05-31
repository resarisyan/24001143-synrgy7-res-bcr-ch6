import { inject, injectable } from 'inversify';
import { KnexRepository } from './base/KnexRepository.js';
import { UserModel } from '../models/UserModel.js';
import TYPES from '../di/types.js';

@injectable()
export class UserRepository extends KnexRepository<UserModel> {
  constructor(@inject(TYPES.UserModel) userModel: typeof UserModel) {
    super(userModel);
  }
  public async findByUsername(username: string): Promise<UserModel> {
    return this.modelClass
      .query()
      .where('username', username)
      .first() as unknown as Promise<UserModel>;
  }
}

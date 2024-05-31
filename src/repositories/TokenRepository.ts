import { RedisRepository } from './base/RedisRepository.js';
import { TokenModel } from '../models/TokenModel.js';
import { injectable } from 'inversify';

@injectable()
export class TokenRepository extends RedisRepository<TokenModel> {
  constructor() {
    super();
  }

  public async findByToken(token: string): Promise<TokenModel> {
    return this.redisClient.hGetAll(token) as unknown as Promise<TokenModel>;
  }
}

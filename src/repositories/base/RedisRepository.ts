import { injectable } from 'inversify';
import { createClient, RedisClientType } from 'redis';

@injectable()
export class RedisRepository<T> {
  protected redisClient!: RedisClientType;

  constructor() {
    this.initializeRedisClient();
  }

  private async initializeRedisClient(): Promise<void> {
    try {
      this.redisClient = createClient({
        url: 'redis://localhost:6379',
        socket: {
          connectTimeout: 1000
        }
      });
      this.redisClient.on('error', (err) =>
        console.log('Redis Client Error', err)
      );
      await this.redisClient.connect();
    } catch (error) {
      console.error('Error initializing Redis Client:', error);
    }
  }

  public async find(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  public async insert(key: string, item: T): Promise<T> {
    await this.redisClient.set(key, JSON.stringify(item));
    return item;
  }

  public async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}

import { inject, injectable } from 'inversify';
import { KnexRepository } from './base/KnexRepository.js';
import TYPES from '../di/types.js';
import { CarModel } from '../models/CarModel.js';
import { Page } from 'objection';

@injectable()
export class CarRepository extends KnexRepository<CarModel> {
  constructor(@inject(TYPES.CarModel) carModel: typeof CarModel) {
    super(carModel);
  }

  public async findOneNotDeleted(item: Partial<CarModel>): Promise<CarModel> {
    const car = await this.modelClass
      .query()
      .whereNotDeleted()
      .findOne(item)
      .throwIfNotFound();
    return car as unknown as CarModel;
  }

  public async findOneDeleted(item: Partial<CarModel>): Promise<CarModel> {
    const car = await this.modelClass
      .query()
      .whereDeleted()
      .findOne(item)
      .throwIfNotFound();
    return car as unknown as Promise<CarModel>;
  }

  public async getAllPaginatedNotDeleted(
    page: number,
    limit: number
  ): Promise<Page<CarModel>> {
    const query = this.modelClass
      .query()
      .whereNotDeleted()
      .page(page, limit)
      .withGraphFetched('[createdBy, updatedBy]');
    return query as unknown as Promise<Page<CarModel>>;
  }

  public async hardDelete(item: Partial<CarModel>): Promise<CarModel> {
    const deleted = this.modelClass.query().where(item).hardDelete();
    return deleted as unknown as Promise<CarModel>;
  }

  public async restore(item: Partial<CarModel>): Promise<CarModel> {
    const restored = this.modelClass.query().where(item).undelete();
    return restored as unknown as Promise<CarModel>;
  }
}

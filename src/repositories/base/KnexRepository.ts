import { injectable } from 'inversify';
import { Model, Page, RelationExpression } from 'objection';
import { SoftDeleteModel } from '../../models/base/SoftDeleteModel';

@injectable()
export abstract class KnexRepository<T extends Model> {
  protected modelClass: typeof SoftDeleteModel;

  constructor(modelClass: typeof Model) {
    this.modelClass = modelClass as typeof SoftDeleteModel;
  }

  public async getAllPaginated(options: {
    page: number;
    limit: number;
    relations?: RelationExpression<T>;
    item?: Partial<T>;
  }): Promise<Page<T>> {
    const { page, limit, relations, item } = options;

    const query = this.modelClass.query().page(page, limit);
    if (item) {
      query.where(item);
    }
    if (relations) {
      query.withGraphFetched(relations);
    }
    return query as unknown as Promise<Page<T>>;
  }

  public async findOne(
    item: Partial<T>,
    relations?: RelationExpression<T>
  ): Promise<T> {
    const query = this.modelClass.query().findOne(item);
    if (relations) {
      query.withGraphFetched(relations);
    }
    return query.throwIfNotFound() as unknown as Promise<T>;
  }

  public async insert(
    item: Partial<T>,
    relations?: RelationExpression<T>
  ): Promise<T> {
    let inserted;
    if (relations) {
      inserted = await this.modelClass
        .query()
        .withGraphFetched(relations)
        .insertAndFetch(item);
    } else {
      inserted = await this.modelClass.query().insertAndFetch(item);
    }
    return inserted as unknown as T;
  }

  public async delete(item: Partial<T>): Promise<T> {
    const deleted = await this.modelClass
      .query()
      .findOne(item)
      .delete()
      .throwIfNotFound();
    return deleted as unknown as T;
  }

  public async update(
    item: Partial<T>,
    update: Partial<T>,
    relations?: RelationExpression<T>
  ): Promise<T> {
    const query = this.modelClass.query();
    if ('id' in item) {
      const id = item.id as string;
      let updated = await query.patchAndFetchById(id, update).throwIfNotFound();
      if (relations) {
        updated = await query
          .findById(id)
          .withGraphFetched(relations)
          .throwIfNotFound();
      }
      return updated as unknown as T;
    } else {
      const existingItem = await query.findOne(item).throwIfNotFound();
      let updated = await existingItem.$query().patchAndFetch(update);
      if (relations) {
        updated = await updated
          .$query()
          .withGraphFetched(relations)
          .throwIfNotFound();
      }
      return updated as unknown as T;
    }
  }
}

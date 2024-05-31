import { Model } from 'objection';
import objectionSoftDelete from 'objection-js-soft-delete';

const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null
});

export class SoftDeleteModel extends softDelete(Model) {}

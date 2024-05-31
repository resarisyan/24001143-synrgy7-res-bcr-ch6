import type { Knex } from 'knex';

const tableName = 'cars';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('plate').notNullable();
    table.string('manufacture').notNullable();
    table.string('model').notNullable();
    table.string('image').notNullable();
    table.integer('rentPerDay').notNullable();
    table.integer('capacity').notNullable();
    table.string('description').notNullable();
    table.string('transmission').notNullable();
    table.integer('year').notNullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
    table
      .uuid('created_by')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
    table
      .uuid('updated_by')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .nullable();
    table
      .uuid('deleted_by')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}

import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

const tableName = 'cars';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const adminIds = await knex('users')
    .where('role', 'ADMIN')
    .orWhere('role', 'SUPERADMIN')
    .select('id')
    .then((rows) => rows.map((row) => row.id));

  // Inserts seed entries
  const cars = Array(10)
    .fill(null)
    .map(() => ({
      plate: faker.vehicle.vin(),
      manufacture: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      image: faker.image.url(),
      rentPerDay: faker.string.numeric(3),
      capacity: faker.string.numeric(1),
      description: faker.lorem.sentence(),
      transmission: 'Automatic',
      year: faker.date.anytime().getFullYear(),
      created_by: adminIds[randomInt(0, adminIds.length - 1)],
      updated_by: adminIds[randomInt(0, adminIds.length - 1)],
      deleted_by: adminIds[randomInt(0, adminIds.length - 1)],
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    }));

  await knex('cars').insert(cars);
}

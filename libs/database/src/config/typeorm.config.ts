import * as database from '../entity';

const entities = (Object.keys(database) as Array<keyof typeof database>).map(
  (entity: keyof typeof database) => database[entity],
);

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'local',
  entities,
  migrations: [__dirname + '/../migration/**{.ts,.js}'],
  cli: {
    entitiesDir: 'libs/database/src/entity',
    migrationsDir: 'libs/database/src/migration',
  },
};

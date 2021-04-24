import * as database from '../entity';

const entities = (Object.keys(database) as Array<keyof typeof database>).map(
  (entity: keyof typeof database) => database[entity],
);

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'database',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: 'postgres',
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

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
  entities: [
    'src/**/*.entity.{js,ts}',
  ],
  migrations:['src/migration/**{.ts,.js}'],
  cli: {
    migrationsDir: ['src/migration'],
    entitiesDir: 'src/**',
  },
};
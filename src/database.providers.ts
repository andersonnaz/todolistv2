import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'todolistv2',
        entities: [
            __dirname + '/../**/*.entity.js',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
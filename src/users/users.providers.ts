import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  }
];
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';
import { UserTry } from 'src/app/user/model/newUser.entitytry';

config();

export const typeOrmConfigs = () => {
  const obj: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(<string>process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'ict_meetup_v7',
    // logging: process.env.NODE_ENV === 'local' || 'development' ? true : false,
    logging: true,
    // logger: 'debug',
    entities: [join(__dirname, '/../app/**/**.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../database/migrations/*.{ts,js}')],
    subscribers: [
      join(
        __dirname,
        `/../database/subscribers/typeorm-entity.subscriber.{ts,js}`
      )
    ],
    synchronize: true
    // driver: pg,
  };
  console.log(obj);
  return obj;
};
export const tryNewTypeOrmConfigs = () => {
  const obj: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(<string>process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.TRY_DB || 'ict_meetup_v7',
    entities: [UserTry],
    name: 'tryDB',
    synchronize: true
    // driver: pg,
  };
  console.log(obj);

  return obj;
};

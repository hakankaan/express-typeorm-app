import { Provider } from './constants';
import { createConnection } from 'typeorm';


export const databaseProviders = [
    {
        provide: Provider.database,
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [
                __dirname + '/**/*.entity.{ts,js}',
            ],
            synchronize: true
        })
    }
]
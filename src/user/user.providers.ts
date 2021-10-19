import { Provider } from "../constants";
import { Connection } from "typeorm";
import { User } from "./user.entity";


export const userProviders = [
    {
        provide: Provider.user,
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [Provider.database]
    }
]
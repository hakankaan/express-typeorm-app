import { Connection } from "typeorm";
import { Provider } from "../constants";
import { Order } from "./order.entity";


export const orderProviders = [
    {
        provide: Provider.order,
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: [Provider.database]
    }
]
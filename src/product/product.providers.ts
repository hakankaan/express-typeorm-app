import { Connection } from "typeorm";
import { Provider } from "../constants";
import { Product } from "./product.entity";


export const productProviders = [
    {
        provide: Provider.product,
        useFactory: (connection: Connection) => connection.getRepository(Product),
        inject: [Provider.database]
    }
]
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import * as faker from 'faker'
import { ProductService } from "../product/product.service";
import { randomInt } from "crypto";
import { UserService } from "../user/user.service";
import { OrderService } from "../order/order.service";

(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const orderService = app.get(OrderService);
    const productService = app.get(ProductService);
    const userService = app.get(UserService);

    const users = await userService.find({});
    const products = await productService.find({});

    for (let i = 0; i <= 30; i++) {
        const randomUser = users[randomInt(0, users.length - 1)]
        const randomProduct = products[randomInt(0, products.length - 1)]
        await orderService.save({
            created_at: new Date(),
            product_id: randomProduct.id,
            user_id: randomUser.id
        });
    }

    process.exit()
})()
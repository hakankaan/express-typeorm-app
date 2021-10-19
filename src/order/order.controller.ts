import { ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Path } from 'src/constants';
import { AuthGuard } from '../auth/auth.guard';
import { ProductService } from '../product/product.service';
import { OrderService } from './order.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService,
        private jwtService: JwtService
    ) { }

    @UseGuards(AuthGuard)
    @Post('user/orders/:productId')
    async create(
        @Req() request: Request,
        @Param('productId') productId: number,
    ) {
        const product = await this.productService.findOne({ id: productId })
        if (!product) {
            throw new NotFoundException('Could not found a product with given id.')
        }

        const user = request.user;
        return await this.orderService.save({
            created_at: new Date(),
            product_id: productId,
            user_id: user['id']
        })
    }

    @UseGuards(AuthGuard)
    @Get(['user/orders', 'admin/orders'])
    async all(
        @Req() request: Request,
    ) {
        const user = request.user
        const isAdmin = request.path === Path.adminOrders
        let orders = [];
        if (isAdmin) {
            orders = await this.orderService.find({ relations: ['user', 'product'] })
        } else {
            orders = await this.orderService.find({ where: { user_id: user['id'] }, relations: ['product'] })
        }

        return orders;
    }


    @UseGuards(AuthGuard)
    @Get(['user/orders/:id', 'admin/orders/:id'])
    async details(
        @Param('id') id: number,
        @Req() request: Request
    ) {
        const isAdmin = request.path.toString().indexOf(Path.adminOrders) >= 0;

        let orderDetails = {};
        if (isAdmin) {
            orderDetails = await this.orderService.findOne({
                id,
                relations: ['user', 'product']
            });
        } else {
            orderDetails = await this.orderService.findOne({ id, relations: ['product'] })
        }

        return orderDetails;
    }

}

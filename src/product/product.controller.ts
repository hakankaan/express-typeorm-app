import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDTO } from './dtos/product-create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @UseGuards(AuthGuard)
    @Get('admin/products')
    async all() {
        return this.productService.find({});
    }

    @UseGuards(AuthGuard)
    @Post('admin/products')
    async create(@Body() body: ProductCreateDTO) {
        return this.productService.save(body)
    }

    @UseGuards(AuthGuard)
    @Get('admin/products/:id')
    async get(@Param('id') id: number) {
        return this.productService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @Put('admin/products/:id')
    async update(
        @Param('id') id: number,
        @Body() body: ProductCreateDTO
    ) {
        await this.productService.update(id, body)
        return this.productService.findOne({ id })
    }

    @UseGuards(AuthGuard)
    @Delete('admin/products/:id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id)
    }
}

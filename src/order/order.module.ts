import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { ProductModule } from '../product/product.module';
import { SharedModule } from '../shared/shared.module';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule, SharedModule, ProductModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService],
  exports: [OrderService]
})
export class OrderModule { }

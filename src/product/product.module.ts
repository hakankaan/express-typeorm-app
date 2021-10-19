import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { DatabaseModule } from '../database.module';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';
import { ProductService } from './product.service';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...productProviders, ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule { }

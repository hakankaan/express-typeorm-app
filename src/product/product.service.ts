import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Provider } from '../constants';
import { AbstractService } from '../shared/abstract.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends AbstractService {
    constructor(
        @Inject(Provider.product) private readonly productRepository: Repository<Product>
    ) {
        super(productRepository)
    }
}

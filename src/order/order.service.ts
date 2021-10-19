import { Inject, Injectable } from '@nestjs/common';
import { Provider } from 'src/constants';
import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends AbstractService {
    constructor(@Inject(Provider.order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository)
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../constants';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @Inject(Provider.user)
        private userRepository: Repository<User>,
    ) {
        super(userRepository)
    }
}

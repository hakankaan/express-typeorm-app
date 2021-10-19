import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database.module';
import { SharedModule } from '../shared/shared.module';

@Global()
@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }

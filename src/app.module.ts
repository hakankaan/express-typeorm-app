import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, SharedModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

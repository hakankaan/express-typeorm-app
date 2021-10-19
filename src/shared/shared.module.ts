import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Jwt } from '../constants';

@Module({
    imports: [
        JwtModule.register({
            secret: Jwt.secret,
            signOptions: { expiresIn: '1d' },
        })
    ],
    exports: [JwtModule]
})
export class SharedModule { }

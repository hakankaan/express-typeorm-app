import { BadRequestException, Body, ClassSerializerInterceptor, ConflictException, Controller, Get, NotFoundException, Post, Put, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Request, response, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { Path } from '../constants';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    @Post(['user/register', 'admin/register'])
    async register(
        @Body() body: RegisterDto,
        @Req() request: Request
    ) {
        const user = await this.userService.findOne({ email: body.email })
        if (user) {
            throw new ConflictException('Email address alreay in use.')
        }

        const { password_confirm, ...data } = body;

        if (body.password !== password_confirm) {
            throw new BadRequestException('Passwords do not match!')
        }

        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.save({
            ...data,
            password: hashed,
            is_admin: request.path === Path.adminRegister
        });
    }

    @Post(['user/login', 'admin/login'])
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request
    ) {
        const user = await this.userService.findOne({ email })
        if (!user) {
            throw new NotFoundException('User not found!');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }

        const adminLogin = request.path === Path.adminLogin

        if (!user.is_admin && adminLogin) {
            throw new UnauthorizedException();
        }

        const jwt = await this.jwtService.sign({
            id: user.id,
            scope: adminLogin ? 'admin' : 'user'
        })

        response.cookie('jwt', jwt, { httpOnly: true })
        return {
            message: 'success'
        };
    }

    @UseGuards(AuthGuard)
    @Get(['user/user', 'admin/user'])
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt']
        const { id } = await this.jwtService.verifyAsync(cookie)

        const user = this.userService.findOne({ id })

        return user
    }

    @UseGuards(AuthGuard)
    @Post(['user/logout', 'admin/logout'])
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')

        return {
            message: 'success'
        }
    }

    @UseGuards(AuthGuard)
    @Put(['user/users/info', 'admin/users/info'])
    async updateInfo(
        @Req() request: Request,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
    ) {
        const cookie = request.cookies['jwt']
        const { id } = await this.jwtService.verifyAsync(cookie)

        const user = this.userService.findOne({ id })

        await this.userService.update(id, {
            first_name,
            last_name,
            email
        })

        return await this.userService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Put(['user/users/password', 'admin/users/password'])
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if (password !== password_confirm) {
            throw new BadRequestException('Passwords do not match.')
        }

        const cookie = request.cookies['jwt']
        const { id } = await this.jwtService.verifyAsync(cookie)

        const user = this.userService.findOne({ id })

        await this.userService.update(id, {
            password: await bcrypt.hash(password_confirm, 12)
        })

        return await this.userService.findOne(id);
    }

}

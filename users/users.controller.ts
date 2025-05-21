import { Controller, Post, Body, Put, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<User> {
        return await this.usersService.createUser(name, email, password);
    }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return await this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    async update(
        @Request() req,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<User> {
        const userId = req.user.userId;
        return await this.usersService.updateUser(userId, name, email, password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserProfile(@Request() req): Promise<User> {
        const userId = req.user.userId;
        return await this.usersService.getUserProfile(userId);
    }
}
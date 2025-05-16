import { Controller, Post, Body, Put, Param, Get, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
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

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<User> {
        return await this.usersService.updateUser(+id, name, email, password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUserProfile(@Param('id') id: string, @Request() req): Promise<User> {
        const userIdFromToken = req.user.userId; 
        const requestedId = +id;

      
        if (userIdFromToken !== requestedId) {
            throw new UnauthorizedException('You can only access your own profile');
        }

        return await this.usersService.getUserProfile(requestedId);
    }
}
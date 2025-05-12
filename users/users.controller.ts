import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
//import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
    
  constructor(
    private readonly usersService: UsersService,
    //private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.usersService.createUser(name, email, password);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.usersService.updateUser(+id, name, email, password);
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.usersService.getUserProfile(+id);
  }
/*
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }*/
}
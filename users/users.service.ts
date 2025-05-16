import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createUser(name: string, email: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ name, email, password });
        return await this.usersRepository.save(user);
    }

    async updateUser(id: number, name: string, email: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new Error('User not found');
        user.name = name;
        user.email = email;
        user.password = password;
        return await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ email });
    }

    async getUserProfile(id: number): Promise<User> { 
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new Error('User not found');
        return user;
    }
}
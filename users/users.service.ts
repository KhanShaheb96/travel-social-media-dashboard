import { Injectable, /*Inject,forwardRef*/ } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './users.entity';
//import { AuthService } from '../auth/auth.service';


@Injectable()
export class UsersService {
    constructor(
        //@Inject(forwardRef(() => AuthService))
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      async createUser(name: string, email: string, password: string) {
        const user = this.usersRepository.create({ name, email, password });
        return await this.usersRepository.save(user);
      }

      async updateUser(id: number, name: string, email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new Error('User not found');
        user.name = name;
        user.email = email;
        user.password = password;
        return await this.usersRepository.save(user);
      }
      async findByEmail(email: string) {
        return await this.usersRepository.findOne({ where: { email } });
      }
    
      async getUserProfile(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new Error('User not found');
        return user;
      }
      
}

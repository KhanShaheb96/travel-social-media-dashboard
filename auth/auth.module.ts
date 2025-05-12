/*import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ forwardRef(() => UsersModule)],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
*/


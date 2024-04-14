import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UsersModule } from '../users/users.module';
@Module({
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    UsersModule,
  ],
})
export class AuthModule {}

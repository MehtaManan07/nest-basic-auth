//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  private readonly logger = new Logger(JwtStrategy.name);

  async validate(payload) {
    const user = await this.usersService.findOne(parseInt(payload.userId));

    if (!user) {
      // console.log('User not foundddd');
      this.logger.error('User not foundds');
      throw new UnauthorizedException();
    }

    return user;
  }
}

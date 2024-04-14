import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({
      where: { email, isDeleted: false },
    });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async signup(data: CreateUserDto): Promise<AuthEntity> {
    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword, isDeleted: false },
    });
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  /**
   * only for dev use
   */
  async getToken(params: { userId: number }): Promise<string> {
    return this.jwtService.sign({ userId: params.userId });
  }
}

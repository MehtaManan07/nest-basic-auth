import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('signup')
  async signup(@Body() data: CreateUserDto) {
    return await this.authService.signup(data);
  }

  @Get('token')
  @ApiQuery({ name: 'userId', type: Number })
  async getToken(@Query() params: { userId: number }) {
    return await this.authService.getToken(params);
  }
}

import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/common/logger';
import { JwtAuthGuard } from '../auth/guard';
import { Request } from 'express';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UsersController.name);
  }

  @Get()
  findAll(@Req() request: Request) {
    this.logger.log('Fetching all users for ' + request.user);
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@Req() req: any) {
    return this.usersService.findMe(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

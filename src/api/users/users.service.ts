import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(private prisma: PrismaService) {
    this.logger = new Logger(UsersService.name);
  }
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({});
    this.logger.log('Users found: ' + users.length);
    const userEntities = users.map((user) => new UserEntity(user));
    return userEntities;
  }

  async findOne(id: number): Promise<UserEntity> {
    const userDoc = await this.prisma.user.findUnique({ where: { id } });
    if (!userDoc) throw new NotFoundException('User not found by id: ' + id);
    const user = new UserEntity(userDoc);
    return user;
  }
  async findMe(req): Promise<UserEntity> {
    return req.user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name } = updateUserDto;

    const userDoc = await this.prisma.user.update({
      where: { id },
      data: { name },
    });

    const updatedUser = new UserEntity(userDoc);
    return updatedUser;
  }

  async remove(id: number) {
    await this.prisma.user.update({ where: { id }, data: { isDeleted: true } });
  }
}

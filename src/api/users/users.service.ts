import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from './entities/user.entity';
import { LoggerService } from 'src/common/logger';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UsersService.name);
  }
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({});
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
    const { id } = req.user;

    return this.findOne(+id);
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

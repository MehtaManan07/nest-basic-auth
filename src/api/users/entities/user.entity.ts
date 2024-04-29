import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @Exclude()
  password: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  contactInfo: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  username: string;
}

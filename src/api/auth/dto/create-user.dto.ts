import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
/**
   id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  isDeleted   Boolean  @default(false)
  username    String   @unique
  password    String // Hashed password stored securely
  name        String
  role        Role     @default(JOBBER)
  contactInfo String?
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name is too short' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role, { message: 'Invalid role' })
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;
}

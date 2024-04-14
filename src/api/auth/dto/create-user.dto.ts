import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name is too short' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

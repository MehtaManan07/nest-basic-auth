import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(15, { message: 'Name is too long' })
  name: string;

  @IsString()
  @MaxLength(100, { message: 'Description is too long' })
  @IsOptional()
  description: string;

  @IsString()
  @MaxLength(100, { message: 'Too many keywords' })
  @IsOptional()
  keywords: string;
}

export class CreateCategoryBulkDto {
  @ApiProperty({ type: [CreateCategoryDto] })
  categories: CreateCategoryDto[];
}

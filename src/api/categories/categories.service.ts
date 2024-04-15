import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'nestjs-prisma';
import { LoggerService } from 'src/common/logger';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(CategoriesService.name);
  }
  async create(createCategoryDto: CreateCategoryDto) {
    await this.prisma.category.create({
      data: createCategoryDto,
    });
    return;
  }

  async createBulk(createCategoryDtos: CreateCategoryDto[]) {
    await this.prisma.category.createMany({
      data: createCategoryDtos,
    });
    return;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({});
    return categories;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category)
      throw new NotFoundException('Category not found by id: ' + id);
    return category;
  }

  async search(params: { query: string }) {
    const { query } = params;
    const categories = await this.prisma.category.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { keywords: { contains: query } },
        ],
      },
    });
    return categories;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    if (!category)
      throw new NotFoundException('Category not found by id: ' + id);
    return category;
  }

  async remove(id: number) {
    const category = await this.prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
    if (!category)
      throw new NotFoundException('Category not found by id: ' + id);
    return;
  }
}

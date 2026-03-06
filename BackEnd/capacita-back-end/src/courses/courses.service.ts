import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        enrollments: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            enrolledAt: true,
          },
          orderBy: { enrolledAt: 'desc' },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: {
        ...updateCourseDto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        price: createCourseDto.price,
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
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { userId, courseId } = createEnrollmentDto;

    const [user, course] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      }),

      this.prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, isPublished: true },
      }),
      
    ]);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    if (!course.isPublished) {
      throw new ConflictException('Curso não está publicado.');
    }

    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      select: { id: true },
    });

    if (existingEnrollment) {
      throw new ConflictException(
        'Usuário já matriculado neste curso.',
      );
    }

    return this.prisma.enrollment.create({
      data: createEnrollmentDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            isPublished: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
            isPublished: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Matrícula não encontrada.');
    }

    return enrollment;
  }

  async findByUser(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async cancel(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException('Matrícula não encontrada.');
    }

    return this.prisma.enrollment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async remove(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException('Matrícula não encontrada.');
    }

    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}
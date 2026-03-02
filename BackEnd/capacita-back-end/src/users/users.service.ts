import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    return this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        enrollments: {
          select: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                price: true,
                isPublished: true,
              },
            },
            enrolledAt: true,
          },
          orderBy: { enrolledAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }
}

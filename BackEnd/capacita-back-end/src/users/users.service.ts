import * as bcrypt from 'bcryptjs';
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

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...createUserDto, 
        password: hashedPassword
      },
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
            id: true,
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

  async update(id: string, updateUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (updateUserDto.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
        select: { id: true },
      });

      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('E-mail já cadastrado.');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Usuário removido com sucesso.' };
  }
}
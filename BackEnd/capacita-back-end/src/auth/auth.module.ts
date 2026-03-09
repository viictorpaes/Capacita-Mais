import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { PrismaService } from '../prisma/prisma.service';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: { expiresIn: '1h' },
    }),

  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})

export class AuthModule { }
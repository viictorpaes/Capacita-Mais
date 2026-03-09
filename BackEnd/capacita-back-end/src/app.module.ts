import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // 👈 1. Avisamos onde o arquivo está

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    CoursesModule, 
    EnrollmentsModule,
    AuthModule // 👈 2. Colocamos o módulo para rodar junto com os outros!
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
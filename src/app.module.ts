import { Module } from '@nestjs/common';
import { carsModule } from './cars/cars.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [carsModule, PrismaModule],
})
export class AppModule {}

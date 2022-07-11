import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { carsModule } from './cars/cars.module';

@Module({
  imports: [carsModule, TypeOrmModule],
})
export class AppModule {}

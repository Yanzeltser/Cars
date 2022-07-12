import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { carsModule } from './cars/cars.module';
import { addressEntity, carEntity } from './models/cars.entity';

@Module({
  imports: [carsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: '0.0.0.0',
    port: 5434,
    username:'postgres',
    password:'123',
    database: 'nest',
    entities: [carEntity,addressEntity],
    synchronize: true,
  })],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController, CarsController } from "./cars.controller";
import { AddressService, CarsService } from "./cars.service";
import { carEntity } from "src/models/cars.entity";

@Module({
    imports:[PrismaModule,TypeOrmModule.forFeature([carEntity])],
    controllers:[AddressController,CarsController],
    providers:[AddressService, CarsService],
})
export class carsModule{}
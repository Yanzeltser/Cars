import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController, CarsController } from "./cars.controller";
import { AddressService, CarsService } from "./cars.service";
import { addressEntity, carEntity } from "src/models/cars.entity";

@Module({
    imports:[TypeOrmModule.forFeature([carEntity, addressEntity])],
    controllers:[AddressController,CarsController],
    providers:[AddressService, CarsService],
})
export class carsModule{}
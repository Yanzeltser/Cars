import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AddressController, CarsController } from "./cars.controller";
import { AddressService, CarsService } from "./cars.service";

@Module({
    imports:[PrismaModule],
    controllers:[AddressController,CarsController],
    providers:[AddressService, CarsService],
})
export class carsModule{}
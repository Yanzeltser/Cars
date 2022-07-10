import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { carsDto } from "./dto";

@Injectable({})
export class CarsService{
    constructor(private prisma: PrismaService){}
    async createCar(dto: carsDto){
        const car = await this.prisma.car.create({
            data:{
                model: dto.model,
                year: Number(dto.year),
                power: Number(dto.power)    
            }
        })
    return car;
    }
   findall(){
    return this.prisma.car.findMany()
   }
   findByID(idInt){
    return this.prisma.car.findUnique({
        where:{
            id: idInt,
        }
    })
   }
   async updateCar(dto: any, idInt: number){
    console.log(dto.model)
    return await this.prisma.car.update({
        where:{
            id: idInt,
        },data:{
            model: dto.model,
            year: Number(dto.year),
            power: Number(dto.power)   
        }
    })
   }
   async deleteCar(id: number){
    return await this.prisma.car.delete({
        where:{
            id: id,
        }
    })
   }
}
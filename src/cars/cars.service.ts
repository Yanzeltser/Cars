import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { addressDto, carsDto } from "./dto";
import {request} from "request"
import { response } from "express";

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
@Injectable({})
export class AddressService{
    constructor(private prisma: PrismaService){}
    async getCoords(inputedAddress: string){
        const axios = require('axios')
        const base_URL="https://maps.googleapis.com/maps/api/geocode/json?address="
        //const jsonText = JSON.parse(myReq);
        return await axios.get(base_URL+inputedAddress+"&key="+process.env.API_KEY).then(async res=>{
            const address = await this.prisma.address.create({
                data: {
                    address: inputedAddress,
                    longitude: res.data.results[0].geometry.location.lat,
                    latitude: res.data.results[0].geometry.location.lng,
                }
            })
            return address;
        });
        }
}



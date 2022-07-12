import { Injectable } from "@nestjs/common";
import { carsDto } from "./dto";
import axios from 'axios';
import { InjectRepository } from "@nestjs/typeorm";
import { addressEntity, carEntity } from "src/models/cars.entity";
import { Repository } from "typeorm";
import 'dotenv/config'
@Injectable({})
export class CarsService{
    constructor(@InjectRepository(carEntity)
    private readonly carRepository: Repository<carEntity>
    ){}
    async createCar(dto: carsDto){
        const car = await this.carRepository.save({
            model: dto.model,
            year: dto.year,
            power: dto.power,  
        })
        return car;
    }
   findall() {
    return this.carRepository.find();
   }
   //returns the json of the car
   findByID(idInt){
    return this.carRepository.find({
        where:{
            id: idInt,
        }
    })
   }
   async updateCar(dto: carsDto, idInt: number){
    console.log(dto.model)
    const car=  this.carRepository.update({ id: idInt},
            {model: dto.model,
            year: Number(dto.year),
            power: Number(dto.power)  } 
    )
    return this.findByID(idInt);
   }
   async deleteCar(id: number){
    await this.carRepository.delete({
            id: id,
        })
    return this.findByID(id);
   }
}
@Injectable({})
export class AddressService{
    constructor(@InjectRepository(addressEntity)
    private readonly addressRepository: Repository<addressEntity>
    ){}
    async getCoords(inputedAddress: string){
        const base_URL="https://maps.googleapis.com/maps/api/geocode/json"
        const res= await axios.get(`${base_URL}?address=${inputedAddress}&key=${process.env.API_KEY}`)
        const address = this.addressRepository.create({
            address: inputedAddress,
            longitude: res.data.results[0].geometry.location.lng,
            latitude: res.data.results[0].geometry.location.lat,
        })
        return address;
    }

}



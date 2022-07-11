import { Injectable } from "@nestjs/common";
import { carsDto } from "./dto";
import axios from 'axios';
import { InjectRepository } from "@nestjs/typeorm";
import { addressEntity, carEntity } from "src/models/cars.entity";
import { Repository } from "typeorm";

@Injectable({})
export class CarsService{
    constructor(@InjectRepository(carEntity)
    private readonly carRepository: Repository<carEntity>
    ){}
    async createCar(dto: carsDto){
        const car = await this.carRepository.create({
            model: dto.model,
            year: dto.year   
        })
        return car;
    }
   findall(){
    return this.carRepository.find()
   }
   findByID(idInt){
    return this.carRepository.find({
        where:{
            id: idInt,
        }
    })
   }
   async updateCar(dto: carsDto, idInt: number){
    console.log(dto.model)
    return await this.carRepository.update({ id: idInt},
            {model: dto.model,
            year: Number(dto.year),
            power: Number(dto.power)  } 
    )
   }
   async deleteCar(id: number){
    return await this.carRepository.delete({
            id: id,
    })
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
            
            // data: {
            //     address: inputedAddress,
            //     longitude: res.data.results[0].geometry.location.lng,
            //     latitude: res.data.results[0].geometry.location.lat,
            // }

        return address;
    }

}



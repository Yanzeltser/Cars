import { Body, Controller, Delete, Get, Post, Put, Req } from "@nestjs/common";
import {  AddressService, CarsService } from "./cars.service";
import { addressDto, carsDto } from "./dto";
import { Param } from "@nestjs/common";
import {ParseIntPipe} from "@nestjs/common"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm" 

@Controller('cars')
export class CarsController{
    constructor(private carsService: CarsService){}
    @Post('createCar')
    createCar(@Body() dto: carsDto){
        console.log({
            dto,    
        })
        return this.carsService.createCar(dto)
    }
    @Get('all')
    async getAllCars(){
        return await this.carsService.findall()
    }
    @Get('getCar/:id')
    async getCarByID(@Param('id', ParseIntPipe) id: number){
        return await this.carsService.findByID(id)
    }
    @Put('update/:id')
    async updateCar(@Body() dto: carsDto, @Param('id', ParseIntPipe) id: number){
        return this.carsService.updateCar(dto, id);
    }
    @Delete('delete/:id')
    async deleteCar( @Param('id', ParseIntPipe) id: number){
        return this.carsService.deleteCar( id);
    }
}
@Controller('address')
export class AddressController{
    constructor(private addressService: AddressService){}
    @Post('getCoords')
    async getCoords(@Body() dto: addressDto){
         return await this.addressService.getCoords(dto.address)
    }
}
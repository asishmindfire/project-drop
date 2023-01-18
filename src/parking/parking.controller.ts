import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VehicleDto } from "./data/vehicle.dto";
import { parkingService } from "./parking.service";


@Controller()
export class ParkingController {

    constructor(private parkingService: parkingService) { }

    // Insert a vehicle into a parking slot
    @Post('/park')
    addVehicle(@Body() vehicle: VehicleDto): VehicleDto[] {
        return this.parkingService.addVehicleService(vehicle);
    }

    // Empty a parking slot
    @Delete('/unpark/:license')
    deleteVehicle(@Param("license") licenseId: string): VehicleDto[] {
        return this.parkingService.deletevehicleService(licenseId);
    }


    @Get('/parking')
    getAllParkingDetails(): VehicleDto[] {
        return this.parkingService.getParkingDetails();
    }

}
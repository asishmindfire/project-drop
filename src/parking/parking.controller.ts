import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { VehicleDto } from "./data/vehicle.dto";
import { parkingService } from "./parking.service";


@Controller()
export class ParkingController {

    constructor(private parkingService: parkingService) { }

    // Insert a vehicle into a parking slot
    @Post('/park')
    addVehicle(@Body(new ValidationPipe()) vehicle: VehicleDto): VehicleDto[] {
        return this.parkingService.addVehicleService(vehicle);
    }

    // Empty a parking slot
    @Delete('/unpark/:license')
    deleteVehicle(@Param("license") licenseId: string): VehicleDto[] {
        return this.parkingService.deletevehicleService(licenseId);
    }

    // Get a parking slot details
    @Get('/slot/:slotId')
    getSlotDetails(@Param("slotId") slotId: string): VehicleDto[] {
        return this.parkingService.getSlotInfo(slotId);
    }


    @Get('/parking')
    getAllParkingDetails(): VehicleDto[] {
        return this.parkingService.getParkingDetails();
    }

}
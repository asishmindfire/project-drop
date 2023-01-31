import { Body, Controller, Delete, Get, Param, Post, UseGuards, HttpException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { VehicleDto } from "./dto/vehicle.dto";
import { ParkResponse } from "./interfaces/parking.model";
import { parkingService } from "./parking.service";


@Controller()
export class ParkingController {

    constructor(private readonly parkingService: parkingService) { }

    /**
     * 
     * @url /park
     * @auth true
     * @desc Insert a vehicle into a parking slot
     * @param vehicleDetails : VehicleDto
     * @returns ParkResponse
     * 
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('/park')
    async addVehicle(@Body() vehicleDetails: VehicleDto): Promise<ParkResponse> {
        try {
            return await this.parkingService.addVehicleService(vehicleDetails);
        } catch (error) {
            throw new HttpException({ status: false, message: error.response }, error.status);
        }
    }

    /**
     * 
     * @url /unpark/:license
     * @auth true
     * @desc Empty a parking slot
     * @param licenseId
     * @returns ParkResponse
     * 
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete('/unpark/:license')
    async deleteVehicle(@Param("license") licenseId: string): Promise<ParkResponse> {
        try {
            return await this.parkingService.deletevehicleService(licenseId);
        } catch (error) {
            throw new HttpException({ status: false, message: error.response }, error.status);
        }
    }

    /**
     * 
     * @url /slot/:slotId
     * @auth true
     * @desc Get a parking slot details
     * @param slotId
     * @returns ParkResponse
     * 
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('/slot/:slotId')
    async getSlotDetails(@Param("slotId") slotId: string): Promise<ParkResponse> {
        try {
            return await this.parkingService.getSlotInfo(slotId);
        } catch (error) {
            throw new HttpException({ status: false, message: error.response }, error.status);
        }
    }


    /**
     * 
     * @url /parking
     * @auth true
     * @desc Get the whole parking details
     * @returns ParkResponse
     * 
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('/park')
    async getAllParkingDetails(): Promise<ParkResponse> {
        try {
            return await this.parkingService.getParkingDetails();
        } catch (error) {
            throw new HttpException({ status: false, message: error.response }, error.status);
        }
    }

}

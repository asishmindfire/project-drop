import { Body, Controller, Delete, Get, Param, Post, UseGuards, HttpException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import sendResponse from "src/utils/sendresponse";
import { IResponse } from "../shared/interfaces/response.interface";
import { VehicleDto } from "./dto/vehicle.dto";
import { Park } from "./entities/parking.entity";
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
    async addVehicle(@Body() vehicleDetails: VehicleDto): Promise<IResponse<Park>> {
        try {
            const data = await this.parkingService.addVehicle(vehicleDetails);
            return sendResponse({ status: true, data, message: "Vehicle parked successfully." })
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
    async deleteVehicle(@Param("license") licenseId: string): Promise<IResponse<Park>> {
        try {
            const data = await this.parkingService.deleteVehicle(licenseId);
            return sendResponse({ status: true, data, message: "Parking slot cleard." });
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
    async getSlotDetails(@Param("slotId") slotId: string): Promise<IResponse<Park>> {
        try {
            const data = await this.parkingService.getSlotInfo(slotId);
            return sendResponse({ status: true, data, message: "Details of given slot." });
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
    async getAllParkingDetails(): Promise<IResponse<Park>> {
        try {
            const data = await this.parkingService.getParkingDetails();
            return sendResponse({ status: true, data, message: "Total parking deatils." });
        } catch (error) {
            throw new HttpException({ status: false, message: error.response }, error.status);
        }
    }

}

import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { VehicleDto } from "./data/vehicle.dto";
import { memoryService } from "./service/inmemory.service";


@Controller()
export class ParkingController {

    constructor(
        private readonly parkingService: memoryService,
        private readonly authService: AuthService
    ) { }


    /**
     * 
     * @url /login
     * @auth false
     * @desc Login route
     * @returns token
     */
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Request() req): object {
        try {
            let token = this.authService.generateToken(req.user);
            var resp = {
                status: true,
                data: token,
                message: "Token generated successfully."
            }
            return resp;
        } catch (error) {
            var err = {
                status: false,
                message: error.message
            }
            return err;
        }
    }


    /**
     * 
     * @url /park
     * @auth true
     * @desc Insert a vehicle into a parking slot
     * @param vehicleDetails : VehicleDto[]
     * @returns VehicleDto
     * @example 
     * {
            "slotId": "b3472adb-e0d3-40ab-842e-4f44e179faa2",
            "isEmpty": false,
            "license": "OD027687",
            "vehicleName": "TATA",
            "ownerName": "Dani"
        }
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('/park')
    addVehicle(@Body(new ValidationPipe()) vehicleDetails: VehicleDto): object {
        try {
            let vehicle = this.parkingService.addVehicleService(vehicleDetails);
            var resp = {
                status: true,
                data: vehicle,
                message: "Vehicle parked successfully."
            }
            return resp;
        } catch (error) {
            var err = {
                status: false,
                message: error.message
            }
            return err;
        }
    }

    /**
     * 
     * @url /unpark/:license
     * @auth true
     * @desc Empty a parking slot
     * @param licenseId
     * @returns VehicleDto
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete('/unpark/:license')
    deleteVehicle(@Param("license") licenseId: string): object {
        try {
            let vehicle = this.parkingService.deletevehicleService(licenseId);
            var resp = {
                status: true,
                data: vehicle,
                message: "Parking slot cleard."
            }
            return resp;
        } catch (error) {
            var err = {
                status: false,
                message: error.message
            }
            return err;
        }
    }

    /**
     * 
     * @url /slot/:slotId
     * @auth true
     * @desc Get a parking slot details
     * @param slotId
     * @returns VehicleDto
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('/slot/:slotId')
    getSlotDetails(@Param("slotId") slotId: string): object {
        try {
            let slotInfo = this.parkingService.getSlotInfo(slotId);
            var resp = {
                status: true,
                data: slotInfo,
                message: "Details of given slot."
            }
            return resp;
        } catch (error) {
            var err = {
                status: false,
                message: error.message
            }
            return err;
        }
    }


    /**
     * 
     * @url /parking
     * @auth true
     * @desc Get the whole parking details
     * @returns VehicleDto
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('/park')
    getAllParkingDetails(): object {
        try {
            let vehicle = this.parkingService.getParkingDetails();
            var resp = {
                status: true,
                data: vehicle,
                message: "Total parking deatils."
            }
            return resp;
        } catch (error) {
            var err = {
                status: false,
                message: error.message
            }
            return err;
        }
    }

}
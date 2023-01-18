import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { VehicleDto } from "./data/vehicle.dto";
import { parkingService } from "./parking.service";


@Controller()
export class ParkingController {

    constructor(
        private readonly parkingService: parkingService,
        private readonly authService: AuthService
    ) { }


    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Request() req): string {
        // Here the authentication completed
        // Next step authorization (jwt token)
        console.log(req.user);
        const token = this.authService.generateToken(req.user);
        return token;
    }

    // Insert a vehicle into a parking slot
    @UseGuards(AuthGuard('jwt'))
    @Post('/park')
    addVehicle(@Body(new ValidationPipe()) vehicleDetails: VehicleDto): object {
        try {
            let vehicle = this.parkingService.addVehicleService(vehicleDetails);
            var resp = {
                status: true,
                data: vehicle,
                message: "Created successfully."
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

    // // Empty a parking slot
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

    // Get a parking slot details
    @UseGuards(AuthGuard('jwt'))
    @Get('/slot/:slotId')
    getSlotDetails(@Param("slotId") slotId: string): VehicleDto[] {
        return this.parkingService.getSlotInfo(slotId);
    }

    // Get the whole parking details
    @UseGuards(AuthGuard('jwt'))
    @Get('/parking')
    getAllParkingDetails(): VehicleDto[] {
        return this.parkingService.getParkingDetails();
    }

}
import { BadRequestException, Injectable } from "@nestjs/common";
import { VehicleDto } from "./data/vehicle.dto";


@Injectable()
export class parkingService {

    // Get full parking slot details from .env
    public parkingDetails: VehicleDto[] = JSON.parse(process.env.PARKINGSIZE);


    // Add vehicle to the parking lot
    addVehicleService(parkingDetail: VehicleDto): VehicleDto[] {
        var check = false;
        var slotIndex = undefined;
        this.parkingDetails = this.parkingDetails.map((slot, index) => {
            if (slot.isEmpty == true && check == false) {
                slot.license = parkingDetail.license;
                slot.vehicleName = parkingDetail.vehicleName;
                slot.ownerName = parkingDetail.ownerName;
                slot.isEmpty = false;
                check = true;
                slotIndex = index;
            }
            return slot;
        });
        if (check == false) {
            throw new BadRequestException({
                "statusCode": 400,
                "message": "Parking lot is full"
            });
        }
        return [this.parkingDetails[slotIndex]];
    }

    // Get whole parking details
    getParkingDetails(): VehicleDto[] {
        return this.parkingDetails;
    }
}
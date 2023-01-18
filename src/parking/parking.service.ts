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

    // Remove vehicle from the parking lot
    deletevehicleService(license: string): VehicleDto[] {
        var isAvailable = false;
        var slotIndex = [{
            license: "",
            vehicleName: "",
            ownerName: "",
            slotId: "",
            isEmpty: true
        }];
        this.parkingDetails = this.parkingDetails.map((slot) => {
            if (license == slot.license) {
                slot.isEmpty = true;
                slotIndex[0].license = slot.license;
                slotIndex[0].vehicleName = slot.vehicleName;
                slotIndex[0].ownerName = slot.ownerName;
                slotIndex[0].slotId = slot.slotId;
                delete slot.license;
                delete slot.vehicleName;
                delete slot.ownerName;
                isAvailable = true;
            }
            return slot;
        });
        if (!isAvailable) {
            throw new BadRequestException({
                "statusCode": 400,
                "message": "Vehicle not available!"
            });
        }
        return slotIndex;
    }


    // Get whole parking details
    getParkingDetails(): VehicleDto[] {
        return this.parkingDetails;
    }
}
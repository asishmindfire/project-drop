import { BadRequestException, Injectable, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { VehicleDto } from "../data/vehicle.dto";
import { v4 as uuidv4 } from 'uuid';
import { envConfig } from "../../config/config.service";

@Injectable()
export class memoryService {

    private parkingDetails = [];
    constructor() {
        const parkingSize = envConfig.parkingLotSize();
        for (let index = 0; index < parkingSize; index++) {
            const payload = {
                "slotId": uuidv4(),
                "isEmpty": true
            }
            this.parkingDetails.push(payload);
        }
    }


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
            throw new HttpException("Parking lot is full", HttpStatus.BAD_REQUEST);
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
            throw new HttpException("Vehicle not available!", HttpStatus.BAD_REQUEST);
        }
        return slotIndex;
    }

    // Get parking slot details
    getSlotInfo(slotId: string): VehicleDto[] {
        var slotDetails = this.parkingDetails.filter((slot) => {
            return slot.slotId == slotId;
        });

        if (slotDetails.length <= 0) {
            throw new HttpException('Please provide a valid slotId.', HttpStatus.BAD_REQUEST);
        }
        return slotDetails;
    }

    // Get whole parking details
    getParkingDetails(): VehicleDto[] {
        return this.parkingDetails;
    }
}
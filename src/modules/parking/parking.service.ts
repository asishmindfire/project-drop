import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { VehicleDto } from "./dto/vehicle.dto";
import { v4 as uuidv4 } from 'uuid';
import { envConfig } from "../../config/config.service";
import { InMemoryService } from "../shared/inmemory.service";
import { Park, ParkResponse } from "./interfaces/parking.model";

@Injectable()
export class parkingService {

    private parkingDetails: Park[] = [];
    constructor(private memorySvc: InMemoryService) {
        this.initParking();
    }

    async initParking(): Promise<void> {
        Array(envConfig.parkingLotSize()).fill(0).forEach(() => {
            this.parkingDetails.push({
                slotId: uuidv4(),
                isEmpty: true
            });
        });
        await this.memorySvc.set('slots', this.parkingDetails, { ttl: 3600 });
    }

    // Add vehicle to the parking lot
    async addVehicleService(parkingDetail: VehicleDto): Promise<ParkResponse> {

        let getSlots = await this.memorySvc.get('slots');
        let check = false;
        let slotIndex = undefined;

        const isLicenseAvailable = getSlots.filter((slot: VehicleDto) => slot.license === parkingDetail.license);

        if (isLicenseAvailable.length > 0) {
            throw new HttpException("This vehicle in already parked!", HttpStatus.CONFLICT);
        }

        getSlots = getSlots.map((slot: VehicleDto, index: number) => {
            if (slot.isEmpty === true && check === false) {
                slot.license = parkingDetail.license;
                slot.vehicleName = parkingDetail.vehicleName;
                slot.ownerName = parkingDetail.ownerName;
                slot.isEmpty = false;
                check = true;
                slotIndex = index;
            }
            return slot;
        });
        if (check === false) {
            throw new HttpException("Parking lot is full", HttpStatus.BAD_REQUEST);
        }
        await this.memorySvc.set('slots', getSlots, { ttl: 3600 });
        return {
            status: true,
            data: getSlots[slotIndex],
            message: "Vehicle parked successfully."
        }
    }

    // Remove vehicle from the parking lot
    async deletevehicleService(license: string): Promise<ParkResponse> {

        let getSlots = await this.memorySvc.get('slots');
        let isAvailable = false;
        let slotIndex: VehicleDto;
        getSlots = getSlots.map((slot: VehicleDto) => {
            if (license == slot.license) {
                slotIndex = { ...slot };
                slot.isEmpty = true;
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
        await this.memorySvc.set('slots', getSlots, { ttl: 3600 });
        return {
            status: true,
            data: slotIndex,
            message: "Parking slot cleard."
        }
    }

    // Get parking slot details
    async getSlotInfo(slotId: string): Promise<ParkResponse> {

        let getSlots = await this.memorySvc.get('slots');
        var slotDetails = getSlots.filter((slot: VehicleDto) => {
            return slot.slotId == slotId;
        });

        if (slotDetails.length <= 0) {
            throw new HttpException('Please provide a valid slotId.', HttpStatus.BAD_REQUEST);
        }
        return {
            status: true,
            data: slotDetails,
            message: "Details of given slot."
        }
    }

    // Get whole parking details
    async getParkingDetails(): Promise<ParkResponse> {
        const data = await this.memorySvc.get('slots');
        if (!data) throw new HttpException('Parking details not found.', HttpStatus.NOT_FOUND);
        return {
            status: true,
            data: data,
            message: "Total parking deatils."
        }
    }
}
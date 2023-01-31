import { VehicleDto } from "../dto/vehicle.dto";
import { Park } from "../entities/parking.entity";

export interface IParkingService {
    initParking(): Promise<void>;
    addVehicle(parkingDetail: VehicleDto): Promise<Park>;
    deleteVehicle(license: string): Promise<Park>;
    getSlotInfo(slotId: string): Promise<Park>;
    getParkingDetails(): Promise<Park>;
}
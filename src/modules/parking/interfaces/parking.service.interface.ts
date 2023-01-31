import { IResponse } from "src/modules/shared/interfaces/response.interface";
import { VehicleDto } from "../dto/vehicle.dto";
import { Park } from "../entities/parking.entity";

export interface IParkingService {
    initParking(): Promise<void>;
    addVehicle(parkingDetail: VehicleDto): Promise<IResponse<Park>>;
    deleteVehicle(license: string): Promise<IResponse<Park>>;
    getSlotInfo(slotId: string): Promise<IResponse<Park>>;
    getParkingDetails(): Promise<IResponse<Park>>;
}
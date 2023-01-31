import { IResponse } from "src/modules/shared/interfaces/response.interface";
import { VehicleDto } from "../dto/vehicle.dto";

export interface ParkResponse extends IResponse {
    status: boolean;
    data?: VehicleDto | VehicleDto[] | string;
    message: string;
}


export interface Park {
    slotId: string;
    isEmpty: boolean;
    license?: string;
    vehicleName?: string;
    ownerName?: string;
}
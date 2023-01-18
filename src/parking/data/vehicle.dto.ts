
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class VehicleDto {

    @IsString()
    license: string;
    
    @IsString()
    vehicleName: string;

    @IsString()
    ownerName: string;

    // @IsString()
    slotId: string;
    // @IsBoolean()
    isEmpty: boolean;
}
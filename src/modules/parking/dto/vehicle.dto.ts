
import { IsString, IsNotEmpty } from 'class-validator';

export class VehicleDto {

    @IsString()
    @IsNotEmpty()
    license: string;
    
    @IsString()
    @IsNotEmpty()
    vehicleName: string;

    @IsString()
    @IsNotEmpty()
    ownerName: string;

    slotId: string;
    isEmpty: boolean;
}
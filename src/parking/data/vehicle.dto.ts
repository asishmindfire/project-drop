
import { IsString, IsInt, IsBoolean, IsEmpty, IsNotEmpty } from 'class-validator';

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

    // @IsString()
    slotId: string;
    // @IsBoolean()
    isEmpty: boolean;
}
import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { parkingService } from './parking.service';


@Module({
    imports: [],
    controllers: [ParkingController],
    providers: [parkingService],
    exports: []
})


export class ParkingModule {
    constructor() {
        console.log('ParkingModule');
    }
}

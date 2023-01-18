import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { ParkingController } from './parking.controller';
import { parkingService } from './parking.service';


@Module({
    imports: [UserModule, AuthModule],
    controllers: [ParkingController],
    providers: [parkingService],
    exports: []
})


export class ParkingModule {
    constructor() {
        console.log('ParkingModule');
    }
}

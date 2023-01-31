import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/users/user.module';
import { InMemoryService } from '../shared/inmemory.service';
import { ParkingController } from './parking.controller';
import { parkingService } from './parking.service';


@Module({
    imports: [UserModule, AuthModule],
    controllers: [ParkingController],
    providers: [parkingService, InMemoryService],
    exports: []
})


export class ParkingModule { }

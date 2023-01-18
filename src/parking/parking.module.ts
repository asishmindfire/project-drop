import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { ParkingController } from './parking.controller';
import { memoryService } from './service/inmemory.service';


@Module({
    imports: [UserModule, AuthModule],
    controllers: [ParkingController],
    providers: [memoryService],
    exports: []
})


export class ParkingModule { }

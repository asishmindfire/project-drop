import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    ParkingModule
  ],
  controllers: [],
  providers: [],
})
export class RootModule {
  constructor() {
    console.log(`RootModule`);
  }
}

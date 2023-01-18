import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { ParkingModule } from './parking/parking.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    ParkingModule,
  ThrottlerModule.forRoot({
    ttl: 1,     // sec
    limit: 429,
  }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class RootModule { }

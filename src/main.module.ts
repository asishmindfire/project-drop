import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { ParkingModule } from './modules/parking/parking.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    ParkingModule,
  ThrottlerModule.forRoot({
    ttl: 1,     // second
    limit: +process.env.RATE_LIMIT_PER_SECOND || 10,
  }),
    UserModule,
    AuthModule,
  CacheModule.register({
    isGlobal: true
  })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class RootModule { }

import { Module, UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportLocalStrategy } from './passport.local.strategy';

@Module({
    imports: [PassportModule, UserModule, JwtModule.register({
        secret: "secret_key",
        signOptions: { expiresIn: '60s' },
    })],
    controllers: [],
    providers: [PassportLocalStrategy, JwtStrategy, AuthService],
    exports: [AuthService]
})

export class AuthModule { }

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RootModule } from '../src/main.module';


describe('ParkingController', () => {
    let app: INestApplication; // This is interface of the nest application

    // This setup the environment
    beforeAll(async () => {
        // moduleFixture is the environment
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [RootModule],  // , UserModule, AuthModule
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

    });

    describe('Login Route POST /auth/login', () => {
        it('should return 200', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: "User3",
                    password: "admin"
                })
                .expect(201)
        });
        it('should return 401', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: "",
                    password: "admin"
                })
                .expect(401)
        });
        it('should return 400', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: "Asish",
                    password: "admin"
                })
                .expect(400)
        });

        it('username should be a string type', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: 2334,
                    password: "admin"
                })
                .expect(400)
        });

        it('should return unauthorized 401', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    username: "User1",
                    password: "adminw"
                })
                .expect(401)
        });
    });

})
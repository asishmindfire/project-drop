import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RootModule } from '../src/root.module';


describe('ParkingController', () => {
    let app: INestApplication; // This is interface of the nest application
    let token = '';

    // This setup the environment
    beforeAll(async () => {
        // moduleFixture is the environment
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [RootModule],  // , UserModule, AuthModule
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const response = await request(app.getHttpServer()).post('/login').send({
            "username": "User3",
            "password": "admin"
        });
        token = response.body.data;
    });


    describe('Park New Vehicle POST /park', () => {

        it('should able to park a vehicle', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    "license": "OD027687",
                    "vehicleName": "TATA",
                    "ownerName": "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(201)
        });

        it('should return 400 when vehicleName not provided', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    "license": "OD027687",
                    "vehicleName": "",
                    "ownerName": "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when license not provided', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    "license": "",
                    "vehicleName": "TATA",
                    "ownerName": "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when ownerName not provided', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    "license": "OD027687",
                    "vehicleName": "TATA",
                    "ownerName": ""
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

    });


    describe('Get Whole Parking Slot GET /park', () => {
        it('should return 200', () => {
            return request(app.getHttpServer())
                .get('/park')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        });
    });


    describe('Login Route POST /login', () => {
        it('should return 200', () => {
            return request(app.getHttpServer())
                .post('/login')
                .send({
                    "username": "User3",
                    "password": "admin"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(201)
        });
    });


    describe('Unpark Vehicle DELETE /unpark/:license', () => {

        it('should return 200', () => {
            return request(app.getHttpServer())
                .delete('/unpark/OD027687')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
        });

        it('should return 400 when given license vehicle not available', () => {
            return request(app.getHttpServer())
                .delete('/unpark/OD0276870')
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });
    });


    describe('Get a Slot Info GET /slot/:slotId', () => {

        it('should return 400 when given slotId not available in parking', () => {
            return request(app.getHttpServer())
                .get('/slot/0e8a24b4-9927-4ead-bbb3-ce586821d77d')
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

    });

})
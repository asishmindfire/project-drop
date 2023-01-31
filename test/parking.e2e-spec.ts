import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { RootModule } from '../src/main.module';


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
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const response = await request(app.getHttpServer()).post('/auth/login').send({
            username: "User3",
            password: "admin"
        });
        token = response.body.data;
    });


    describe('Park New Vehicle POST /park', () => {

        it('should able to park a vehicle', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "OD027687",
                    vehicleName: "TATA",
                    ownerName: "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(201)
        });

        it('should return 400 when vehicleName not provided', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "OD027687",
                    vehicleName: "",
                    ownerName: "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when license not provided', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "",
                    vehicleName: "TATA",
                    ownerName: "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when ownerName not provided', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "OD027687",
                    vehicleName: "TATA",
                    ownerName: ""
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when vehicleName is a number', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "OD027687",
                    vehicleName: 4567,
                    ownerName: "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when ownerName is a number', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "OD027687",
                    vehicleName: "TATA",
                    ownerName: 5677
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 400 when license is a number', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: 4568,
                    vehicleName: "TATA",
                    ownerName: "Dani"
                })
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 401 when authorization is missing/wrong', () => {
            return request(app.getHttpServer())
                .post('/park')
                .send({
                    license: "OD027687",
                    vehicleName: "TATA",
                    ownerName: "Dani"
                })
                .expect(401)
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

        it('should return 401 when authorization is wrong/missing', () => {
            return request(app.getHttpServer())
                .delete('/unpark/OD0276870')
                .expect(401)
        });
    });


    describe('Get a Slot Info GET /slot/:slotId', () => {

        it('should return 400 when given slotId not available in parking', () => {
            return request(app.getHttpServer())
                .get('/slot/0e8a24b4-9927-4ead-bbb3-ce586821d77d')
                .set('Authorization', `Bearer ${token}`)
                .expect(400)
        });

        it('should return 401 when authorization is wrong/missing', () => {
            return request(app.getHttpServer())
                .get('/slot/0e8a24b4-9927-4ead-bbb3-ce586821d77d')
                .expect(401)
        });

    });

})
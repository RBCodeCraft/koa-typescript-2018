
import * as Koa from 'koa';
import { Server } from 'http';
import * as supertest from 'supertest';
import * as superagent from 'superagent';
import { registerRoutes } from '../../routes';

import { ICatsService } from '../../services/cats';
import { Cat } from '../../models/cat';
import { IVetService } from '../../services/vet';

const mockCat: Cat = new Cat({
    id: 1,
    name: 'mock_cat',
    age: 2,
    likesFish: false,
});
const mockDiagnosis = 'mock_diagnosis';

class MockCatsService implements ICatsService {
    async getCat() {
        return mockCat;
    }
}

class MockVetService implements IVetService {
    async examineCat() {
        return mockDiagnosis;
    }
}

describe('CatVet XP Professional Edition', () => {
    let server: Server;
    let request: supertest.SuperTest<any>;

    beforeAll(async () => {
        const app = new Koa();
        app.use((ctx, next) => {
            ctx.services = {
                cats: new MockCatsService(),
                vet: new MockVetService()
            };
            return next();
        });
        registerRoutes(app);
        server = app.listen();
        request = supertest.agent(server);
    });

    describe('GET /catvet', () => {
        let response: superagent.Response;

        beforeAll(async () => {
            response = await request.get('/catvet');
        });

        it('Returns a 200', () => {
            expect(response.status).toEqual(200);
        });

        it('Renders correct page title', () => {
            expect(response.text).toContain('<title>CatVet XP Professional Edition</title>');
        });

        it('Renders cat name', () => {
            expect(response.text).toContain(mockCat.name);
        });

    });

    describe('POST /catvet', () => {
        let response: superagent.Response;

        beforeAll(async () => {
            response = await request.post('/catvet')
                .type('form')
                .send(mockCat);
        });

        it('Returns a 200', () => {
            expect(response.status).toEqual(200);
        });

        it('Returns expected response', () => {
            expect(response.text).toEqual(`We examined ${mockCat.name}. Diagnosis: ${mockDiagnosis}`);
        });

    });

    afterAll(() => {
        server.close();
    });

});

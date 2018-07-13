
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import { registerCatVetRoutes } from './views/catvet';

export function registerRoutes(app: Koa) {

    const router = new KoaRouter();

    router.get('/test1', async (ctx) => {
        ctx.body = `This is the first test route`;
    });

    router.get('/test2/:id', async (ctx) => {
        ctx.body = {
            id: ctx.params.id,
            name: 'Test Record',
            age: 3
        };
    });

    registerCatVetRoutes(router);

    app.use(router.routes());

}

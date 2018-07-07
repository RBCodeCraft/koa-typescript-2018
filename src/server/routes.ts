
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import { registerViews } from './views';

export function registerRoutes(app: Koa) {

    const router = new KoaRouter();

    router.get('/test1', async (ctx) => {
        ctx.body = `This is the first test route`;
    });

    router.get('/test2', async (ctx) => {
        ctx.body = `This is the second test route`;
    });

    registerViews(router);

    app.use(router.routes());

}

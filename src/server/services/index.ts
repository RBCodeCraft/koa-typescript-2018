
import * as Koa from 'koa';
import { CatsService } from './cats';
import { VetService } from './vet';

declare module 'koa' {
    interface Context {
        services: {
            cats: CatsService,
            vet: VetService,
        };
    }
}

export function registerServices(app: Koa) {

    app.use(async (ctx, next) => {
        ctx.services = {
            cats: new CatsService(),
            vet: new VetService(),
        };
        await next();
    });

}

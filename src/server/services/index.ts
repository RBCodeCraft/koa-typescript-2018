
import * as Koa from 'koa';
import { CatService } from './cat';
import { VetService } from './vet';

declare module 'koa' {
    interface Context {
        services: {
            cat: CatService,
            vet: VetService,
        };
    }
}

export function registerServices(app: Koa) {

    app.use(async (ctx, next) => {
        ctx.services = {
            cat: new CatService(),
            vet: new VetService(),
        };
        await next();
    });

}

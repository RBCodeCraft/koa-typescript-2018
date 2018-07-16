
import * as Koa from 'koa';
import { config } from './config';

const app = new Koa();

// Log Requests
app.use(async (ctx, next) => {
    const start = Date.now();

    await next();

    const responseTime = Date.now() - start;
    console.log(`${ctx.status} ${ctx.method} ${ctx.url} - ${responseTime}ms`);
});

// Use koa-router
import { registerRoutes } from './routes';
registerRoutes(app);

// CatVet
import { registerServices } from './services';
import { registerCatVetRoutes } from './views/catvet';
registerServices(app);
registerCatVetRoutes(app);

// Return Hello World!
app.use(async (ctx) => {
    ctx.body = 'Hello World!';
});

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);












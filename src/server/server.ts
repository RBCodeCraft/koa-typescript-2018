
import * as Koa from 'koa';

import { config } from './config';
import { registerRoutes } from './routes';
import { registerServices } from './services';

const app = new Koa();

// Log Requests
app.use(async (ctx, next) => {
    const start = new Date().getMilliseconds();
    await next();
    const responseTime = new Date().getMilliseconds() - start;
    console.log(`${ctx.status} ${ctx.method} ${ctx.url} - ${responseTime}ms`);
});

// Return Hello World!
app.use(async (ctx, next) => {
    ctx.body = 'Hello World!';
});

registerServices(app);
registerRoutes(app);

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);


import * as Koa from 'koa';
import { config } from './config';

const app = new Koa();

// Log Requests
app.use(async (ctx, next) => {
    const start = new Date().getMilliseconds();

    await next();

    const responseTime = new Date().getMilliseconds() - start;
    console.log(`${ctx.status} ${ctx.method} ${ctx.url} - ${responseTime}ms`);
});

// Use routes and services
import { registerRoutes } from './routes';
import { registerServices } from './services';
registerServices(app);
registerRoutes(app);

// Return Hello World!
app.use(async (ctx) => {
    ctx.body = 'Hello World!';
});

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);

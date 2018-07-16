
import * as React from 'react';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaBodyparser from 'koa-bodyparser';
import { render } from './helper';
import { CatVet } from './components/CatVet';
import { Cat } from '../models/cat';

export function registerCatVetRoutes(app: Koa) {

    const router = new KoaRouter();

    // CatVet View...

    router.get('/catvet', async (ctx) => {

        const title = 'CatVet XP Professional Edition';
        const cat = await ctx.services.cats.getCat();

        ctx.body = render(title,
            <div>
                <h1 className="text-center">{title}</h1>
                <CatVet
                    cat={cat}
                />
            </div>
        );

    });

    // CatVet POST Handler...

    router.post('/catvet', KoaBodyparser(), async (ctx) => {
        const postData = ctx.request.body;
        const cat = new Cat({
            id: postData.id,
            age: postData.age,
            name: postData.name,
            likesFish: postData.likesFish
        });
        cat.validate();

        const diagnosis = await ctx.services.vet.examineCat(cat);
        ctx.body = `We examined ${cat.name}. Diagnosis: ${diagnosis}`;
    });

    app.use(router.routes());

}

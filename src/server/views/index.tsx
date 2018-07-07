
import * as React from 'react';
import * as KoaRouter from 'koa-router';
import * as KoaBodyparser from 'koa-bodyparser';
import { render } from './helper';
import { CatVet } from './components/CatVet';
import { Cat } from '../models/cat';

export function registerViews(router: KoaRouter) {

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
        const cat = new Cat(ctx.request.body);
        const diagnosis = await ctx.services.vet.examineCat(cat);
        ctx.body = `We examined ${cat.name}. Diagnosis: ${diagnosis}`;
    });

}

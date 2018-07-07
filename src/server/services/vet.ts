
import { Cat } from '../models/cat';

export interface IVetService {
    examineCat(cat: Cat): Promise<string>;
}

export class VetService implements IVetService {

    async examineCat(cat: Cat) {

        console.log(`Examining '${cat.name}'...`);

        return `All good, just furballs :-)`;
    }

}

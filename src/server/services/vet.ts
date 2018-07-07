
import { Cat } from '../models/cat';

export interface IVetService {
    examineCat(cat: Cat): Promise<void>;
}

export class VetService implements IVetService {

    async examineCat(cat: Cat) {
        console.log(`Examining '${cat.name}'...`);
    }

}

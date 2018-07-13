
import { Cat } from '../models/cat';

export interface ICatsService {
    getCat(): Promise<Cat>;
}

export class CatsService implements ICatsService {
    async getCat() {
        return new Cat({
            id: 1,
            name: 'Felix',
            age: 2,
            likesFish: true,
        });
    }
}

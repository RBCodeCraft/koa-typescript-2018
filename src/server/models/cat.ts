
export class Cat {
    id: number;
    name: string;
    age: number;
    likesFish: boolean;

    constructor(data: Cat) {
        Object.assign(this, data);
    }

}

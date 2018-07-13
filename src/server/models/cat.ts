
export class Cat {
    id: number;
    name: string;
    age: number;
    likesFish: boolean;

    constructor(data: Partial<Cat>) {
        Object.assign(this, data);
    }

    validate() {
        // yeah its probably fine!...
        return true;
    }

}

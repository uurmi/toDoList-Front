export class Category {
    _id?: string;
    name?: string;
    description?: string;
    createdAt?: Date;
    color?: string;

    constructor(name: string, description?: string, color?: string) {
        this.name = name
        this.description = description
        this.color = color
    }
}

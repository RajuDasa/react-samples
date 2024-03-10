import { Actor } from "./helper";

export class Block {
    public id: number;
    public text: string;

    constructor(id: number) {
        this.id = id;
        this.text = '';
    }
    isChecked(): boolean {
        return this.text !== '';
    }
    onCheck(value: Actor): void {
        this.text = value;
    }
}

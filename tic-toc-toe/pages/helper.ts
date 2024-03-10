import { MiniMax } from "./minimax";

export enum Actor { ME = 'X', BOT = 'O' };
export interface Move { row: number; col: number }

export function initialMatrixState() {
    let matrix = new MiniMax();
    matrix.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    return matrix;
}

export const matrixMapping: Move[] = [
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
    { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
];
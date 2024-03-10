import { useEffect, useState } from "react";
import { Block } from "./block";
import { Actor, initialMatrixState, matrixMapping } from "./helper";
import { MiniMax } from "./minimax";

export default function Main() {

    const initialState = Array(9).fill(1).map((e, idx) => new Block(idx));
    let winner: string;

    const [user, updateUser] = useState(Actor.BOT);
    const [blocks, updateBlocks] = useState(initialState);
    const [matrix, updateMatrix] = useState(initialMatrixState);

    useEffect(() => {
        if (user === Actor.BOT) {
            botChanged();
        } else {
            evaluate();
        }
    }, [blocks]);

    const userChanged = (block: Block) => {
        if (!block.isChecked() && !matrix.winnerIs) {
            updateState(block);
        }
    };

    const updateState = (block: Block) => {
        if (user === Actor.ME) {
            block.onCheck(Actor.ME);
            updateUser(Actor.BOT);
            matrix.blockIndex = block.id;
        }
        else {
            block.onCheck(Actor.BOT);
            updateUser(Actor.ME);
        }
        const idx = blocks.findIndex(b => b.id === block.id);
        const itms = blocks.toSpliced(idx, 1, block);
        updateBlocks(itms);
    };

    const botChanged = () => {
        //convert block to board item.
        if (matrix.blockIndex) {
            const boardItem = matrixMapping[matrix.blockIndex];
            matrix.board[boardItem.row][boardItem.col] = Actor.ME;
        }

        const move = matrix.bestMove();
        if (move) {
            //get block from move
            const index = matrixMapping.findIndex(obj => obj.row === move.row && obj.col === move.col);
            const block = blocks.find(b => b.id === index);
            updateState(block);
        }
    };

    const evaluate = () => {
        if (areFiveMovesDone()) {
            const result = matrix.evaluate();
            if (result) {
                //alert('winner: ' + result);
                matrix.winnerIs = result == Actor.BOT ? "BOT" : result == Actor.ME ? "Human" : "Tie";
                //rerender UI
                updateMatrix({ ...matrix } as MiniMax);
            }
        }
    };
    //min moves for evaluating winner
    const areFiveMovesDone = () => blocks.filter(b => b.isChecked()).length >= 5;

    return (
        <>
            <div className="text-center"><span className="font-bold">Tic Toc Toe</span> with BOT</div>
            <div className="grid grid-cols-[repeat(3,1fr)] grid-rows-[repeat(3,1fr)] gap-0 *:aspect-square *:text-4xl/[100px]">
                {
                    blocks.map(block =>
                        <div key={block.id} onClick={userChanged.bind(null, block)}
                            className="bg-[#f0f0f0] text-center border-2 border-solid border-[blue] cursor-pointer">{block.text}
                        </div>
                    )
                }
            </div>
            <div className={(matrix.winnerIs ? 'text-center' : 'hidden')}><span className="font-bold">Winner: </span>{matrix.winnerIs}</div>
        </>
    );
}
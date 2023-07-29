import React, {useState} from 'react';
import { GameResult } from '../Types';

interface GameProps {
    returnBack(): void;
    submitResult(result: GameResult): void;
}

 interface PlayerState  {
    lives: number;
    attack: number;
    defence: number;
 }

const gameMap = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

export const Game = ({returnBack, submitResult}: GameProps) => {
    const [XCoord, updateXCoord] = useState<number>(0);
    const [YCoord, updateYCoord] = useState<number>(0);

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.ctrlKey && evt.keyCode == 90) {
            alert("Ctrl-Z");
        }
        switch (evt.key) {
            case 'ArrowDown':
                if (YCoord < 8) {
                    updateYCoord(YCoord + 1);
                }
                break;
            case 'ArrowUp':
                if (YCoord > 0) {
                    updateYCoord(YCoord - 1);
                }
                break;
            case 'ArrowLeft':
                if (XCoord > 0) {
                    updateXCoord(XCoord - 1);
                }
                break;
            case 'ArrowRight':
                if (XCoord < 8) {
                    updateXCoord(XCoord + 1);
                }
                break;
            default:
                console.log('unsupported key')
                break;
        }
    };

return <>
<div onClick={returnBack}>Back</div>
<div>Game</div>
<ul>
{gameMap.map((row, rowIndex) => 
    <li key={rowIndex}>
        {
            row.map((block, columnIndex) => <span key={columnIndex}>{(YCoord === rowIndex && XCoord === columnIndex) ? '@' : block}</span>)
        }
    </li>
)}
</ul>
<div onClick={() => {submitResult({isWon: false, slainBy: 'ghoul', floor: 2, date: new Date()})}}>Lose</div>
<div onClick={() => {submitResult({isWon: true, floor: 20, date: new Date()})}}>Win</div>
</>};

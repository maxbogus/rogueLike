import React, {useState} from 'react';
import { GameResult } from '../Types';

interface GameProps {
    returnBack(): void;
    submitResult(result: GameResult): void;
}

interface GameState {
    floor: number
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
    const [player, updatePlayer] = useState<PlayerState>({lives: 10, attack: 2, defence: 2});
    const [game, updateGame] = useState<GameState>({floor: 0});
    const exitCoordinates = [4, 4];

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
        if (XCoord === exitCoordinates[0] && YCoord === exitCoordinates[1]) {
            updateGame({floor: game.floor+1});
            updateXCoord(0);
            updateYCoord(0);
        }
        if (game.floor === 2) {
            submitResult({isWon: true, floor: game.floor, date: new Date()});
            returnBack();
        }
    };

    const drawTiles = (xCoord, yCoord) => {
        if (YCoord === xCoord && XCoord === yCoord) {
            
        }

    }

    return <>
            <div onClick={returnBack}>Back</div>
            <div onClick={() => {submitResult({isWon: false, slainBy: 'ghoul', floor: game.floor, date: new Date()})}}>Lose</div>
            <div onClick={() => {submitResult({isWon: true, floor: game.floor, date: new Date()})}}>Win</div>
            <p />
            <div>Status: Lives: {player.lives}. Floor: {game.floor}</div>
            <p />
            <div>
            {gameMap.map((row, rowIndex) => 
                <div key={rowIndex}>
                    {
                        row.map((block, columnIndex) => <span key={columnIndex}>{(YCoord === rowIndex && XCoord === columnIndex) ? '@' : '0'}</span>)
                    }
                </div>
            )}
            </div>
        </>;
};

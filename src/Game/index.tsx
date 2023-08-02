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
    position: {
        x: number;
        y: number;
    }
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
    const [player, updatePlayer] = useState<PlayerState>({lives: 10, attack: 2, defence: 2, position: {x: 0, y: 0}});
    const [game, updateGame] = useState<GameState>({floor: 0});
    const exitCoordinates = [4, 4];

    document.onkeydown = function(evt) {
        const {position: {x, y}} = player;
        evt = evt || window.event;
        if (evt.ctrlKey && evt.keyCode == 90) {
            alert("Ctrl-Z");
        }
        switch (evt.key) {
            case 'ArrowDown':
                if (y < 8) {
                    updatePlayer({
                        ...player,
                        position: {
                            ...player.position,
                            y: y + 1
                        }
                    });
                }
                break;
            case 'ArrowUp':
                if (y > 0) {
                    updatePlayer({
                        ...player,
                        position: {
                            ...player.position,
                            y: y - 1
                        }
                    });
                }
                break;
            case 'ArrowLeft':
                if (x > 0) {
                    updatePlayer({
                        ...player,
                        position: {
                            ...player.position,
                            x: x - 1
                        }
                    });
                }
                break;
            case 'ArrowRight':
                if (x < 8) {
                    updatePlayer({
                        ...player,
                        position: {
                            ...player.position,
                            x: x + 1
                        }
                    });
                }
                break;
            default:
                console.log('unsupported key')
                break;
        }
        if (x === exitCoordinates[0] && y === exitCoordinates[1]) {
            updateGame({floor: game.floor+1});
            updatePlayer({
                ...player,
                position: {
                    y: 0,
                    x: 0
                }
            });
        }
        if (game.floor === 2) {
            submitResult({isWon: true, floor: game.floor, date: new Date()});
            returnBack();
        }
        if (player.lives <= 0) {
            submitResult({isWon: false, slainBy: 'ghoul', floor: game.floor, date: new Date()});
            returnBack();
        }
    };

    return <>
            <div onClick={returnBack}>Back</div>
            <p />
            <h2>Status</h2>
            <div>Lives: {player.lives}. Floor: {game.floor}</div>
            <p />
            <div>
            {gameMap.map((row, rowIndex) => 
                <div key={rowIndex}>
                    {
                        row.map((block, columnIndex) => <span key={columnIndex}>{(player.position.y === rowIndex && player.position.x === columnIndex) ? '@' : '0'}</span>)
                    }
                </div>
            )}
            </div>
        </>;
};

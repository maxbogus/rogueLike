import React, {useState} from 'react';
import {GameResult, GameState, PlayerState} from '../Types';
import {useStyles} from "./styles";

interface GameProps {
    returnBack(): void;
    submitResult(result: GameResult): void;
}

const gameMap = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
    ['#', '*', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
    ['#', '*', '*', '.', '.', '.', 'P', '.', '.', '.', '.', '.', '#'],
    ['#', '.', '^', '.', '.', '>', '.', '.', '.', '.', '.', '.', '#'],
    ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
    ['#', '.', '^', '.', '.', '.', '*', '.', '.', '.', '.', '.', '#'],
    ['#', '.', '*', '.', '*', '.', '.', '.', '.', '.', '.', '.', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

const drawTiles = ({position}, rowIndex, columnIndex) => (position.y === rowIndex && position.x === columnIndex) ? '@' : gameMap[rowIndex][columnIndex];

export const Game = ({returnBack, submitResult}: GameProps) => {
    const {tile, map} = useStyles();
    const [player, updatePlayer] = useState<PlayerState>({lives: 10, attack: 2, defence: 2, position: {x: 1, y: 1}});
    const [game, updateGame] = useState<GameState>({floor: 0});
    const exitCoordinates = [4, 4];

    document.onkeydown = (evt) => {
        const {position: {x, y}} = player;
        switch (evt.key) {
            case 'ArrowDown':
                if (y < 7) {
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
                if (y > 1) {
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
                if (x > 1) {
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
                if (x < 7) {
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
            updateGame({floor: game.floor + 1});
            updatePlayer({
                ...player,
                position: {
                    y: 1,
                    x: 1
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
        <p/>
        <h2>Status</h2>
        <div>Lives: {player.lives}. Floor: {game.floor}</div>
        <p/>
        <div className={map}>
            {
                gameMap.map((row, rowIndex) =>
                    <div key={rowIndex}>
                        {
                            row.map((block, columnIndex) => {
                                return <div className={tile}
                                    key={columnIndex}>{drawTiles(player, rowIndex, columnIndex)}</div>;
                            })
                        }
                    </div>
                )
            }
        </div>
    </>;
};

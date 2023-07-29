import React from 'react';
import { GameResult } from '../Types';

interface GameProps {
    returnBack(): void;
    submitResult(result: GameResult): void;
}

export const Game = ({returnBack, submitResult}: GameProps) => <>
<div onClick={returnBack}>Back</div>
<div>Game</div>
<div onClick={() => {submitResult({isWon: false, slainBy: 'ghoul', floor: 2, date: new Date()})}}>Lose</div>
<div onClick={() => {submitResult({isWon: true, floor: 20, date: new Date()})}}>Win</div>
</>;

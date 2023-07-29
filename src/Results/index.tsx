import React from 'react';
import { GameResult } from '../Types';

interface ResultsProps {
    results: GameResult[];
    returnBack(): void;
};

const showResult = ({isWon, slainBy, floor}: GameResult): string => `${isWon ? `Player won` : `Player slayed by ${slainBy}`}  on floor ${floor}.`;

export const Results = ({returnBack, results}: ResultsProps) => <>
<div onClick={returnBack}>Back</div>
<div>Results:</div>
<ul>
    {
    (results.length >  0) 
    ? results.map((result, index) => <li key={index}>{`${index}. ${showResult(result)}`}</li>)
    : <li>No results</li>
    }
</ul>
</>;

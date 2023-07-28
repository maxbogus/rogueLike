import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';

const menuItems = ['Game', 'Results', 'Help'];

interface GameResult {
    isWon: boolean;
    slainBy?: string;
    floor: number;
    date: Date;
}

const showResult = ({isWon, slainBy, floor}: GameResult): string => `${isWon ? `Player won` : `Player slayed by ${slainBy}`}  on floor ${floor}.`;

const App = () => {
    const [selectedState, updateState] = useState<string>(menuItems[0]);
    const [results, updateResults] = useState<GameResult[]>([]);
    const renderMenu = () => <>
        <ul>
            {menuItems.map(item => <li key={item} onClick={() => {
                updateState(item);
            }}>{item}</li>)}
        </ul>
    </>;

    const renderResults = () => <>
        <div onClick={() => updateState('Menu')}>Back</div>
        <div>Results:</div>
        <ul>
            {results.map((result, index) => <li key={index}>{`${index}. ${showResult(result)}`}</li>)}
        </ul>
    </>;

    const renderGame = () => <>
        <div onClick={() => updateState('Menu')}>Back</div>
        <div>Game</div>
        <div onClick={() => {updateResults([...results, {isWon: false, slainBy: 'ghoul', floor: 2, date: new Date()}])}}>Lose</div>
        <div onClick={() => {updateResults([...results, {isWon: true, floor: 20, date: new Date()}])}}>Win</div>
    </>;

    const renderHelp = () => <>
        <div onClick={() => updateState('Menu')}>Back</div>
        <div>Help</div>
    </>;

    const showState = (currentState: string) => {
        switch (currentState) {
            case 'Help': {
                return renderHelp();
            }
            case 'Game': {
                return renderGame();
            }
            case 'Results': {
                return renderResults();
            }
            default: {
                return renderMenu();
            }
        }
    }

    return (<div>
    <h1>Roguelike</h1>
        {showState(selectedState)}
</div>)};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

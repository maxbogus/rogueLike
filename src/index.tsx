import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';

const menuItems = ['Game', 'Results', 'Help'];

const App = () => {
    const [selectedState, updateState] = useState<string>(menuItems[0]);
    const renderMenu = () => <>
        <ul>
            {menuItems.map(item => <li key={item} onClick={() => {
                updateState(item);
            }}>{item}</li>)}
        </ul>
    </>;

    const renderResults = () => <>
        <div onClick={() => updateState('Menu')}>Back</div>
        <div>Results</div>
    </>;

    const renderGame = () => <>
        <div onClick={() => updateState('Menu')}>Back</div>
        <div>Game</div>
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

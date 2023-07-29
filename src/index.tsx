import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import { GameResult } from './Types';
import { Results } from './Results';
import { Help } from './Help';
import { Game } from './Game';

const menuItems = ['Game', 'Results', 'Help'];

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

    const showState = (currentState: string) => {
        switch (currentState) {
            case 'Help': {
                return <Help returnBack={() => {updateState('Menu')}} />;
            }
            case 'Game': {
                return <Game returnBack={() => {updateState('Menu')}} submitResult={(result) => {updateResults([...results, result])}} />;
            }
            case 'Results': {
                return <Results returnBack={() => {updateState('Menu')}} results={results} />;
            }
            default: {
                return renderMenu();
            }
        }
    }

    return (<div>
      <h1>Roguelike</h1>
      {showState(selectedState)}
      </div>
      )
    };

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

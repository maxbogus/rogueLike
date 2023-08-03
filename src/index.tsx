import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';

import { GameResult, GameScreen } from './Types';
import { Results } from './Results';
import { Help } from './Help';
import { Game } from './Game';

const menuItems = [GameScreen.Game, GameScreen.Results, GameScreen.Help];

const App = () => {
    const [selectedState, updateState] = useState<string>(GameScreen.Menu);
    const [results, updateResults] = useState<GameResult[]>([]);

    const renderMenu = () => <>
        <ul>
            {menuItems.map(item => <li key={item} onClick={() => {
                updateState(item);
            }}>{item}</li>)}
        </ul>
    </>;

    const showState = (currentState: GameScreen) => {
        switch (currentState) {
            case GameScreen.Help: {
                return <Help returnBack={() => {updateState(GameScreen.Menu)}} />;
            }
            case GameScreen.Game: {
                return <Game returnBack={() => {updateState(GameScreen.Menu)}} submitResult={(result) => {updateResults([...results, result])}} />;
            }
            case GameScreen.Results: {
                return <Results returnBack={() => {updateState(GameScreen.Menu)}} results={results} />;
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

interface GameResult {
    isWon: boolean;
    slainBy?: string;
    floor: number;
    date: Date;
}

enum GameScreen {
    Game = "Game",
    Results = "Results",
    Help = "Help",
    Menu = "Menu"
}

interface GameState {
    floor: number
}

interface PlayerState {
    lives: number;
    attack: number;
    defence: number;
    position: {
        x: number;
        y: number;
    }
}


export {GameResult, GameScreen, GameState, PlayerState};

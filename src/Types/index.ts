
interface GameResult {
    isWon: boolean;
    slainBy?: string;
    floor: number;
    date: Date;
}

export {GameResult};

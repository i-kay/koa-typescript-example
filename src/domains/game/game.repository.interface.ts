import { GameId } from './game.types';
import { Game } from './game.model';

export interface GameRepository {
    findById(gameId: GameId[]): Promise<Game[]>;
    saveOne(game: Game): Promise<GameId>;
}

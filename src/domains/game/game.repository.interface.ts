import { GameId } from './game.types';
import { Game } from './game.model';

export interface GameRepository {
    findOneByGameId(gameId: GameId): Game;
    findByGameIds(gameIds: GameId[]): Game[];
    findAll(): Game[];
    saveOne(game: Game): void;
}

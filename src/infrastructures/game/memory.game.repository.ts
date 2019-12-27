import { GameRepository } from '../../domains/game/game.repository.interface';
import { Game } from '../../domains/game/game.model';
import { GameId, GameState } from '../../domains/game/game.types';

import * as games from '../../../data/games.json';

const gamesData = [...games];

export class MemoryGameRepository implements GameRepository {
    findOneByGameId(gameId: GameId): Game {
        const game = gamesData.find(game => game.gameId === gameId);
        if (!game) {
            return null;
        }
        const gameEntity = new Game({
            gameId: game.gameId,
            gameState: game.state as GameState,
            numbers: game.numbers,
            bonus: game.bonus,
        });

        return gameEntity;
    }

    findByGameIds(gameIds: GameId[]): Game[] {
        const games = gamesData.filter(game => gameIds.includes(game.gameId));
        if (!games || games.length === 0) {
            return null;
        }
        const gameEntities: Game[] = [];

        for (const game of games) {
            gameEntities.push(
                new Game({
                    gameId: game.gameId,
                    gameState: game.state as GameState,
                    numbers: game.numbers,
                    bonus: game.bonus,
                }),
            );
        }

        return gameEntities;
    }

    findAll(): Game[] {
        return gamesData.map(game => {
            return new Game({
                gameId: game.gameId,
                gameState: game.state as GameState,
                numbers: game.numbers,
                bonus: game.bonus,
            });
        });
    }

    saveOne(game: Game): void {
        const row = gamesData.find(g => g.gameId === game.getGameId());
        if (row) {
            // update
            row.state = game.getGameState();
            row.numbers = game.getnumbers();
            row.bonus = game.getbonus();
        } else {
            // insert
            const newGame = {
                gameId: game.getGameId(),
                state: GameState.BEFORE_PULL,
            };
            gamesData.push(newGame);
        }
    }
}

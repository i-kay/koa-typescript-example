import { Connection } from 'mysql2/promise';

import { GameRepository as IGameRepository } from '../../domains/game/game.repository.interface';
import { Game } from '../../domains/game/game.model';
import { GameId } from '../../domains/game/game.types';

export class GameRepository implements IGameRepository {
    constructor(private dbConn: Connection) {}

    async findById(gameId: number[]): Promise<Game[]> {
        const [games, _] = await this.dbConn.query(
            `SELECT * FROM Game WHERE id IN (?)`,
            [gameId],
        );
        if (games.length === 0) {
            return null;
        }
        const gameModels = games.map(game => {
            return new Game({
                id: game.id,
                state: game.state,
                numbers: [
                    game.number1,
                    game.number2,
                    game.number3,
                    game.number4,
                    game.number5,
                    game.number6,
                    game.number7,
                ],
                createdAt: game.createdAt,
                drawnAt: game.drawnAt,
            });
        });

        return gameModels;
    }
    async saveOne(game: Game): Promise<GameId> {
        const [rows, _] = await this.dbConn.query(
            `SELECT COUNT(*) AS cnt FROM Game WHERE id = ? LIMIT 1`,
            [game.id],
        );
        // 없으면 insert, 있으면 update
        if (rows[0].cnt > 0) {
            // update
            const values = [
                game.state,
                game.numbers[0],
                game.numbers[1],
                game.numbers[2],
                game.numbers[3],
                game.numbers[4],
                game.numbers[5],
                game.numbers[6],
                game.drawnAt,
                game.id,
            ];
            const sql = this.dbConn.format(
                `
                UPDATE Game
                SET state = ?, number1 = ?, number2 = ?, number3 = ?, number4 = ?, number5 = ?, number6 = ?, number7 = ?, drawnAt = ?
                WHERE id = ?
                `,
                values,
            );
            await this.dbConn.query(sql);
            return game.id;
        } else {
            // insert
            const values = {
                id: game.id,
                createdAt: game.createdAt,
            };
            const [results, _] = await this.dbConn.query(
                `INSERT INTO Game SET ?`,
                [values],
            );
            return results.intertId;
        }
    }
}

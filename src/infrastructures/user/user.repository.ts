import { UserRepository as IUserRepository } from '../../domains/user/user.repository.interface';
import { User } from '../../domains/user/user.model';
import { UserId } from '../../domains/user/user.types';
import { Connection } from 'mysql2/promise';

export class UserRepository implements IUserRepository {
    constructor(private dbConn: Connection) {}

    async findById(userId: number): Promise<User> {
        const [rows, _] = await this.dbConn.query(
            `SELECT * FROM User WHERE id = ?`,
            [userId],
        );
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const userModel = new User({
            id: user.id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            loginAt: user.loginAt,
            deletedAt: user.deletedAt,
        });
        return userModel;
    }

    async findByEmail(email: string): Promise<User> {
        const [rows, _] = await this.dbConn.query(
            `SELECT * FROM User WHERE email = ?`,
            [email],
        );
        if (rows.length === 0) {
            return null;
        }
        const user = rows[0];
        const userModel = new User({
            id: user.id,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            loginAt: user.loginAt,
            deletedAt: user.deletedAt,
        });
        return userModel;
    }

    async saveOne(user: User): Promise<UserId> {
        // 있으면 업데이트, 없으면 삽입
        const values = {
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            loginAt: user.loginAt,
        };
        const [results, _] = await this.dbConn.query(`INSERT INTO User SET ?`, [
            values,
        ]);

        return results.intertId;
    }
}

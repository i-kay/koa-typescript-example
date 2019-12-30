import { UserRepository as IUserRepository } from '../../domains/user/user.repository.interface';
import dbClient from '../../libs/mysql-client';
import { User } from '../../domains/user/user.model';
import { UserId } from '../../domains/user/user.types';
import { resolve } from 'bluebird';

export class UserRepository implements IUserRepository {
    async findById(userId: number): Promise<User> {
        return new Promise(resolve => {
            dbClient.query(
                `SELECT * FROM User WHERE id = ?`,
                [userId],
                (error, rows) => {
                    if (error) throw error;
                    const user = rows[0];
                    const userModel = new User({
                        id: user.id,
                        email: user.email,
                        password: user.password,
                        createdAt: user.createdAt,
                        loginAt: user.loginAt,
                        deletedAt: user.deletedAt,
                    });
                    resolve(userModel);
                },
            );
        });
    }

    async findByEmail(email: string): Promise<User> {
        return new Promise(resolve => {
            dbClient.query(
                `SELECT * FROM User WHERE email = ?`,
                [email],
                (error, rows) => {
                    if (error) throw error;
                    const user = rows[0];
                    if (rows.length === 0) {
                        resolve(null);
                    } else {
                        const userModel = new User({
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            createdAt: user.createdAt,
                            loginAt: user.loginAt,
                            deletedAt: user.deletedAt,
                        });
                        resolve(userModel);
                    }
                },
            );
        });
    }

    async saveOne(user: User): Promise<UserId> {
        // 있으면 업데이트, 없으면 삽입
        return new Promise(resolve => {
            const values = {
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
                loginAt: user.loginAt,
            };
            dbClient.query(
                `INSERT INTO User SET ? `,
                [values],
                (error, results) => {
                    if (error) throw error;
                    resolve(results.insertId);
                },
            );
        });
    }
}

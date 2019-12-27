export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;

if (!NODE_ENV) {
    throw new Error('NODE_ENV is undefined');
}

if (!PORT) {
    throw new Error('PORT is undefined!');
}

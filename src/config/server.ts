export const server = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
};

Object.entries(server).forEach(([key, value]) => {
    if (value === undefined) {
        throw new Error(`env ${key} is undefined!`);
    }
});

const dotenv = require('dotenv');
dotenv.config();

export const endPoint = process.env.MY_API_URL;
export const apiKey = process.env.MY_API_KEY;
export const port = process.env.MY_PORT;
export const nodeEnv = process.env.MY_NODE_ENV;
export const host = process.env.MY_HOST;

console.log('nodeEnv', nodeEnv);

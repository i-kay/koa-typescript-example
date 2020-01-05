import { createHmac } from 'crypto';

// secret를 다른 곳에서 import 해야 안전하다.
const secret = 'mySecret';

export const encode = (text: string): string => {
    return createHmac('sha256', secret)
        .update(text)
        .digest('hex');
};

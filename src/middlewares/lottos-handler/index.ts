export const workSomething = (ctx, next): void => {
    // do something
    console.log('my middleware');
    next();
};

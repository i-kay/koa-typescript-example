export const workSomething = (ctx, next) => {
    // do something
    console.log('my middleware');
    next();
};

export const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error(error);
        ctx.status = error.status || error.output.statusCode || 500;
        ctx.body = error.message;
        ctx.app.emit('error', error, ctx);
    }
};

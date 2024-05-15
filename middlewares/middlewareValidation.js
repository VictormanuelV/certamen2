export function schemaMiddleware(schema){
    let factor;
    const validateMiddleware = (request, response, next) => {
        response.setHeader('Content-Type', 'application/json')
        try {
            factor = schema.validateSync(request.body, {
                    stripUnknown: true,
                });
                request.body.factor = factor;
        } catch (ex) {
            return response.status(400).json();
        }
        next()
    }

    return validateMiddleware;
}
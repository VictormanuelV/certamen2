import { Router } from "express";
import { userLogin, userLogout } from '../repositories/users.js';
import { tokenMiddleware } from '../middlewares/middlewareXauth.js';
import { loginSchema } from '../schemas/authSchema.js';
import { schemaMiddleware } from '../middlewares/middlewareValidation.js';

const router = new Router();

router.post('/login', schemaMiddleware(loginSchema), async (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    let user = request.body.factor;
    const loggeduser = await userLogin(user.username, user.password);
    if(!loggeduser) return response.status(401).send();
    if(loggeduser.status === 401) return response.status(401).send();
    return response.status(200).json(loggeduser.data);
});

router.post('/logout', tokenMiddleware, (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if(!userLogout(request.body.user.token)) return response.status(401).send();
    response.status(204).json();
});

export default router;
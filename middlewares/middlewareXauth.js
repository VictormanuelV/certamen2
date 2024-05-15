import {getUser} from '../repositories/users.js';

export const tokenMiddleware = (request, response, next) => {
	const xAuth = request.headers['x-authorization'];

	if(!xAuth) return response.status(401).json();

	const userauth = getUser(xAuth);
	if(!userauth) return response.status(401).json({ error: 'Token no valido.' });
	request.body.user = userauth;
	next();
}
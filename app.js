import express from 'express'
import AuthController from './controllers/auth.js';
import ToDosController from './controllers/toDos.js';

export const app = express();
app.use(express.static('public'));
app.use(express.json());

app.get('/api', (request, response) => {
	response.setHeader('Content-Type','text/plain');	
	response.setHeader('Cache-Control', 'no-store');
	response.status(200).send('Hello World!');
});

app.use('/api', AuthController);
app.use('/api/todos', ToDosController);

export default app;
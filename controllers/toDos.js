import { Router } from "express";
import {tokenMiddleware} from '../middlewares/middlewareXauth.js';
import { createToDoSchema, updateToDoSchema } from '../schemas/toDosSchema.js';
import { createToDo, updateToDo, deleteToDo, getToDo, getToDos } from '../repositories/toDos.js';
import { schemaMiddleware } from '../middlewares/middlewareValidation.js';

const router = new Router();

router.get('/', tokenMiddleware, (request, response) => {
	response.setHeader('Content-Type', 'application/json');
	response.status(200).json(getToDos());
});

router.get("/:id", tokenMiddleware, (request, response) => {
    const todo = getToDo(request.params.id);
    if (!todo) return response.status(404).json();
    return response.status(200).json(todo);
});

router.post('/', tokenMiddleware, schemaMiddleware(createToDoSchema), (request, response) => {
	let todo = request.body.factor;
    response.setHeader('Content-Type', 'application/json')
    response.status(201).json(createToDo(todo));
});

router.put('/:id', tokenMiddleware, schemaMiddleware(updateToDoSchema), (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const id = request.params.id;
    let todo = request.body.factor;
    
    const currenttodo = updateToDo(id, todo);
    if(!currenttodo) return response.status(404).json();
	return response.status(200).json(currenttodo);
});

router.delete("/:id", tokenMiddleware, (request, response) => {
    const id = request.params.id;
    if (!deleteToDo(id)) response.status(404).json();
    return response.status(204).json();
  });

export default router;
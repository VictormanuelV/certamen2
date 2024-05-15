import { randomUUID } from "node:crypto";

export const toDos = [];

export function getToDos() {
    return toDos;
}

export function getToDo(id) {
    return toDos.find(td => td.id === id) ?? null;
}

export function createToDo(todo) {
    const newtodo = {
        ...todo,
        id: randomUUID(),   
        completed: false
    };
    toDos.push(newtodo);
    return newtodo;
}

export function updateToDo(id, todo) {
    const currenttodo = getToDo(id);
    if (!currenttodo) return null;
    currenttodo.title = todo.title ?? currenttodo.title;
    currenttodo.completed = todo.completed ?? currenttodo.completed;
    return currenttodo;
}

export function deleteToDo(id) {
    const index = toDos.findIndex(td => td.id === id);
    if (index === -1) return false;
    toDos.splice(index, 1);
    return true;
}
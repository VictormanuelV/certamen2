import { checkPassword } from '../helpers/checkPass.js';
import { randomBytes } from 'node:crypto'
import fs from "node:fs";

export const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

/*export const users = [{
	username: 'admin',
	name: 'Gustavo Alfredo Marín Sáez',
	password: '1b6ce880ac388eb7fcb6bcaf95e20083:341dfbbe86013c940c8e898b437aa82fe575876f2946a2ad744a0c51501c7dfe6d7e5a31c58d2adc7a7dc4b87927594275ca235276accc9f628697a4c00b4e01' // certamen123
}]*/



export function getUser(token) {
    return users.find(user => user.token === token) ?? null;
}

export async function userLogin(username, password){
    const user = users.find(u => u.username === username);
    if(!user) return null;
    
    try{
        const equalpass = await checkPassword(password, user.password);
        if(!equalpass) return {status: 401};
        user.token = randomBytes(48).toString('hex');
        const userdata = { username: user.username, name: user.name, token: user.token }
        return {status: 200, data: userdata};
    }catch(ex){
        return null;
    }
}

export function userLogout(token){
    const user = users.find(u => u.token === token);
    if(!user) return null;
    delete user.token;
    return true;
}
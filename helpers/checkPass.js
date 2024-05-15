import { scrypt } from 'node:crypto'

export const checkPassword = (password, hash) => {
	return new Promise((resolve, reject) => {
		const [salt, pass] = hash.split(':');
		scrypt(password, salt, 64, (error, key) => {
			if(error){
				reject(false);
			}
			resolve(key.toString('hex')===pass);
		});
	});
}
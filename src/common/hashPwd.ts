import bcrypt, { hash } from 'bcrypt'

export default function hashPwd (password: string | Buffer): string {
	const salt = bcrypt.genSaltSync()

	const hash = bcrypt.hashSync(password, salt) 
	
	return hash
}


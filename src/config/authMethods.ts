import bcrypt from 'bcrypt'

export function comparePwd (
	inputPassword: string, 
	actualPassword: string
): boolean {
	return bcrypt.compareSync(inputPassword, actualPassword)
}


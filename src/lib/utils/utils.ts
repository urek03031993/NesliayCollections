import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
import { v4 } from 'uuid';


export function encriptPass(password: string): string {
    return bcrypt.hashSync(password, 12);    
}

export function isValidPass(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export function buildRequestBody(data: FormData): Record<string, unknown>{
	const body: Record<string, unknown> = {}

	for (const [key, value] of data.entries()) {
		body[key] = value;
	}

	return body
}

export function buildImageName(fileName: string): string {
	const ext = fileName.split('.')
	const uuid = v4();

	if ( ext.length === 0 ) {
		return uuid
	}
	return `${uuid}.${ext[ext.length - 1]}`
}

export function buildSlug(name: string, color: string): string {
	return name.toLowerCase() + color.toLowerCase()
}

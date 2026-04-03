export function match(value: string) {
	const id = Number(value)
	return Number.isInteger(id) && id > 0
}


// src/params/fruit.js
// import type { ParamMatcher } from '@sveltejs/kit';

// export const match = ((param: string): param is ('apple' | 'orange') => {
// 	return param === 'apple' || param === 'orange';
// }) satisfies ParamMatcher;

// src/routes/fruits/[page=fruit]
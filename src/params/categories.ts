import type { ParamMatcher } from '@sveltejs/kit';
import { Categories } from '$lib/interfaces';


export const match = ((param: string): param is Categories => {
	return param in Categories;
}) satisfies ParamMatcher;


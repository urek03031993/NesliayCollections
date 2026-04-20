export function match(value: string) {
	const id = Number(value)
	return Number.isInteger(id) && id > 0
}

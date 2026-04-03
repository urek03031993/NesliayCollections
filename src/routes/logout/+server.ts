export async function POST({ cookies }): Promise<Response> {
	cookies.delete('session', { path: '/' });
	return new Response(null, { status: 204 });
}

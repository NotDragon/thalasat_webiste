import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export const GET: RequestHandler = async ({ params }) => {
	const { mode, date, z, x, y } = params;

	// Construct path to the image
	const filePath = path.resolve(`tilemaps/${mode}/${date}/${z}/${x}/${y}.png`);
	
	try {
		const file = await fs.readFile(filePath);
		return new Response(file, {
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'public, max-age=31536000'
			}
		});
	} catch (err) {
		return new Response('Not Found', { status: 404 });
	}
};

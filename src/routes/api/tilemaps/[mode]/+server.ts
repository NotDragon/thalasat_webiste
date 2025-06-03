import { json, type RequestHandler  } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

function parseDateUTC(dateStr: string): Date {
	const [year, month, day] = dateStr.split('-').map(Number);
	return new Date(Date.UTC(year, month - 1, day));
}

export const GET: RequestHandler = async ({ params }) => {
    const { mode } = params;
	const dirPath = path.resolve(`tilemaps/${mode}`); // adjust as needed

	let entries: string[];

	try {
		entries = fs.readdirSync(dirPath);
	} catch (err) {
		return json({ error: 'Could not read directory' }, { status: 500 });
	}

	if (entries.length < 2) {
		return json({ error: 'Not enough entries to determine spacing' }, { status: 400 });
	}

	// Always extract just the YYYY-MM-DD prefix
	const dates = entries.map((e) => e.split('T')[0]);

	// Deduplicate and sort
	// const sortedDates = Array.from(new Set(dates))
	// 	.map((d) => new Date(d))
	// 	.filter((d) => !isNaN(d.getTime()))
	// 	.sort((a, b) => a.getTime() - b.getTime());

    const sortedDates = Array.from(new Set(dates))
	    .map(parseDateUTC)
	    .sort((a, b) => a.getTime() - b.getTime());


	if (sortedDates.length < 2) {
		return json({ error: 'Not enough valid dates to determine spacing' }, { status: 400 });
	}

	const first = sortedDates[0].toISOString().split('T')[0];
	const last = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];

	// Calculate spacing in days
	const millisInDay = 1000 * 60 * 60 * 24;
	const spacing = Math.round(
		(sortedDates[1].getTime() - sortedDates[0].getTime()) / millisInDay
	);

	return json({ first, last, spacing });
}

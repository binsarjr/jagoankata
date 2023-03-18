import type { KataKataInspirasi } from '../app'
import { lamaBaca } from '../lib/lamaBaca'

addEventListener('message', (event) => {
	let finishAt: Date;
	const results: KataKataInspirasi[] = event.data.results;
	let result: KataKataInspirasi = event.data.result;

	finishAt = lamaBaca(result.author + ' ' + result.text).finishAt;

	setInterval(() => {
		if (new Date() > finishAt) {
			result = results[Math.floor(Math.random() * results.length)];
			finishAt = lamaBaca(result.author + ' ' + result.text).finishAt;
            postMessage(result)
		}
	}, 1000);
});

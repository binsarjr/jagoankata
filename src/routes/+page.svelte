<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import type { KataKataInspirasi } from '../app';
	import { lamaBaca } from '../lib/lamaBaca';
	import FinishWorker from './finishworker?worker';

	let results: KataKataInspirasi[] = [];
	let result: KataKataInspirasi | null;

	const getData = async () => {
		const target = new URL($page.url.toString());
		target.pathname = '/api/filsuf';
		const resp = await fetch(target.toString());
		results = (await resp.json()) as KataKataInspirasi[];
		result = results[Math.floor(Math.random() * results.length)];
	};

	let finishWorker: Worker;

	$: if (browser) {
		if (finishWorker) finishWorker.terminate();
		finishWorker = new FinishWorker();
		finishWorker.addEventListener('message', (event) => {
			result = null;
			setTimeout(() => {
				result = event.data;
			}, 500);
		});
	}

	$: if (browser && finishWorker && results.length) finishWorker.postMessage({ results, result });
</script>

<main class="flex flex-col justify-center items-center h-screen w-[90vw] mx-auto">
	{#await getData()}
		loading...
	{:then _}
		{#if result}
			<div transition:fade class="flex flex-col gap-2 text-center w-full md:w-1/2 text-lg">
				<a target="_blank" href="https://www.google.com/search?q={result.author}+{result.text}">
					{result.text}
					<svg
						class="inline"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v9l-3.794-3.793l-5.999 6l-1.414-1.414l5.999-6L12 3h9z"
						/></svg
					>
				</a>
				<h3 class="font-bold text-xl">- {result.author}</h3>
			</div>
                <!-- <span id="refresh">Refresh:
                    {lamaBaca(result.author + ' ' + result.text).finishAt.toTimeString()}
                </span> -->
		{/if}
	{/await}
</main>

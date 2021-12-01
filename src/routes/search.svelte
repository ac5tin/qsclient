<script context="module" lang="ts">
	import type { post, qInput, qResponse } from '$lib/api';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const q = page.query.get('q');
		const lang = page.query.get('lang') || 'en';
		const limit = parseInt(page.query.get('limit')) || 10;
		const offset = parseInt(page.query.get('offset')) || 0;

		let posts: post[] = [];

		const req: qInput = {
			query: q,
			lang,
			limit,
			offset,
			score_details: false
		};
		const res: qResponse = await fetch(`/api/q`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(req)
		}).then(async (res) => await res.json());

		if (res.ok) {
			posts = res.posts;
		}

		return {
			props: {
				q,
				lang,
				posts,
				limit,
				offset
			}
		};
	};
</script>

<script lang="ts">
	import Q from '$lib/q.svelte';
	import moment from 'moment';
	export let q: string;
	export let lang: string;
	export let limit: number;
	export let offset: number;
	export let posts: post[];

	const prettyPrint = (text: string, max: number = 100): string => {
		return text.length > max ? text.replaceAll(/<[^>]*>/g, '').substr(0, max) + '...' : text;
	};
</script>

<svelte:head>
	<title>Searching: {q}</title>
</svelte:head>

<section>
	<Q query={q} {lang} {offset} />
	{#if posts.length}
		<h2>Search results for "{q}"</h2>
		<div id="results">
			{#each posts as post}
				<div class="item">
					<a href={post.url} target="_blank">
						<h3>{post.title}</h3>
					</a>
					<time>{post.timestamp ? moment(post.timestamp * 1000).fromNow() : ''}</time>
					<p>{prettyPrint(post.summary)}</p>
					<a class="url" href={post.url} target="_blank">{prettyPrint(post.url, 200)}</a>
				</div>
			{/each}
		</div>
	{:else}
		<p>No results found ...</p>
	{/if}

	<div id="pages">
		{#if offset > 0}
			<a href={`/search?q=${q}&lang=${lang}&limit=${limit}&offset=${offset - limit}`}>Previous</a>
		{:else}
			<p />
		{/if}
		<p>Page {offset / limit + 1}</p>
		{#if posts.length == limit}
			<a href={`/search?q=${q}&lang=${lang}&limit=${limit}&offset=${offset + limit}`}>Next</a>
		{/if}
	</div>
</section>

<style>
	h2 {
		color: white;
	}

	time {
		color: #c0c0c096;
	}

	#results > .item {
		display: grid;
		grid-template-columns: max-content max-content 1fr;
		column-gap: 1em;
		padding: 0.75rem 0;
		row-gap: 0.5rem;
	}

	#results > .item > * {
		align-self: center;
		justify-self: left;
	}
	#results > .item h3 {
		margin: 0;
		max-width: 60vw;
	}
	#results > .item > time {
		font-size: 0.7rem;
	}
	#results > .item > p {
		grid-row: 2 / span 1;
		grid-column: 1 / span 3;
		margin: 0;
		color: #f0f0f0fb;
	}

	#results > .item > a.url {
		font-size: 0.7rem;
		grid-row: 3 / span 1;
		grid-column: 1 / span 3;
	}

	#pages {
		display: flex;
		justify-content: space-between;
	}

	#pages > * {
		color: #b1b1b1;
	}
</style>

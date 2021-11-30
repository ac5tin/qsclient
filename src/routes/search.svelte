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
				posts
			}
		};
	};
</script>

<script lang="ts">
	import moment from 'moment';
	export let q: string;
	export let posts: post[];
</script>

<svelte:head>
	<title>Searching: {q}</title>
</svelte:head>

<section>
	{#if posts.length}
		<h2>Search results for "{q}"</h2>
		<div id="results">
			{#each posts as post}
				<div class="item">
					<a href={post.url} target="_blank">
						<h3>{post.title}</h3>
					</a>
					<time>{post.timestamp ? moment(post.timestamp * 1000).fromNow() : ''}</time>
					<p>{post.summary}</p>
				</div>
			{/each}
		</div>
	{:else}
		<p>No results found ...</p>
	{/if}
</section>

<style>
	#results > .item {
		display: grid;
		grid-template-columns: auto 5em auto;
		padding: 0.75rem 0;
		row-gap: 0.5rem;
	}

	#results > .item > * {
		align-self: center;
		justify-self: center;
	}
	#results > .item h3 {
		margin: 0;
	}
	#results > .item > time {
		font-size: 0.7rem;
	}
	#results > .item > p {
		grid-row: 2 / span 1;
		grid-column: 1 / span 3;
		margin: 0;
	}
</style>

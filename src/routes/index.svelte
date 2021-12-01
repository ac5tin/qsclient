<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Q from '$lib/q.svelte';
</script>

<svelte:head>
	<title>QuickSearch</title>
</svelte:head>

<section>
	<h1>QuickSearch</h1>
	<p>...</p>
	<Q query={'a.i. machine learning'} lang={'en'} offset={0} />
</section>

<style>
	section {
		display: grid;
	}

	h1 {
		width: 100%;
	}
</style>

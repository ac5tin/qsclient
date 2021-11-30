<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	let query: string = 'a.i. machine learning';

	const handleSubmit = () => {
		location.href = `/search?q=${query}`;
	};
</script>

<svelte:head>
	<title>QuickSearch</title>
</svelte:head>

<section>
	<h1>QuickSearch</h1>
	<p>...</p>
	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" placeholder="Search" bind:value={query} />
		<button type="submit">Search</button>
	</form>
</section>

<style>
	section {
		display: grid;
	}

	form {
		display: grid;
		grid-template-columns: auto 5em;
		column-gap: 1em;
	}
	h1 {
		width: 100%;
	}
</style>

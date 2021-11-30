<script lang="ts">
	export let query: string;

	const handleSubmit = () => {
		location.href = `/search?q=${query}`;
	};
</script>

<section>
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
</style>

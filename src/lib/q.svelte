<script lang="ts">
	export let query: string;
	export let lang: string;

	const handleSubmit = () => {
		location.href = `/search?q=${query}&lang=${lang}`;
	};
</script>

<section>
	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" placeholder="Search" bind:value={query} />
		<select bind:value={lang}>
			<option value="en">Eng</option>
			<option value="zh">Zh</option>
		</select>
		<button type="submit">Search</button>
	</form>
</section>

<style>
	section {
		display: grid;
	}

	form {
		display: grid;
		grid-template-columns: auto repeat(2, 5em);
		column-gap: 1em;
	}
</style>

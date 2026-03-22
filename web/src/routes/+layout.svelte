<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="version" content={__APP_VERSION__} />
	<meta name="generator" content="districtdrift {__APP_VERSION__}" />
</svelte:head>

{@render children()}

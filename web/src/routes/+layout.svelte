<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="version" content={__APP_VERSION__} />
	<meta name="generator" content="districtdrift {__APP_VERSION__}" />

	<!-- Primary meta -->
	<meta name="description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022." />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="District Drift" />
	<meta property="og:title" content="District Drift — US Congressional Gerrymandering" />
	<meta property="og:description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022." />
	<meta property="og:url" content="https://districtdrift.org" />

	<!-- Twitter / X card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="District Drift — US Congressional Gerrymandering" />
	<meta name="twitter:description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022." />
</svelte:head>

{@render children()}

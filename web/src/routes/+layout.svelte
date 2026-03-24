<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="canonical" href="https://districtdrift.org/" />
	<meta name="version" content={__APP_VERSION__} />
	<meta name="generator" content="districtdrift {__APP_VERSION__}" />

	<!-- Primary meta -->
	<meta name="description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022. An independent project by Kana Nadarajan." />
	<meta name="keywords" content="gerrymandering, redistricting, congressional districts, efficiency gap, partisan lean, US politics, election maps" />
	<meta name="author" content="Kana Nadarajan" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="District Drift" />
	<meta property="og:title" content="District Drift — US Congressional Gerrymandering" />
	<meta property="og:description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022." />
	<meta property="og:url" content="https://districtdrift.org/" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter / X card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="District Drift — US Congressional Gerrymandering" />
	<meta name="twitter:description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022." />

	<!-- JSON-LD structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "District Drift",
		"url": "https://districtdrift.org/",
		"description": "Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every state from 1992 to 2022.",
		"author": { "@type": "Person", "name": "Kana Nadarajan" },
		"about": {
			"@type": "Thing",
			"name": "Congressional Redistricting",
			"description": "Historical analysis of US congressional district boundaries and partisan gerrymandering from 1992 to 2022"
		}
	})}</script>`}
</svelte:head>

{@render children()}

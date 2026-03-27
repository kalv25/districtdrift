<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="version" content={__APP_VERSION__} />
	<meta name="generator" content="districtdrift {__APP_VERSION__}" />

	<!-- Primary meta — overridden per-page in +page.svelte -->
	<meta name="description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every US state from 1992 to 2024." />
	<meta name="keywords" content="gerrymandering, redistricting, congressional districts, efficiency gap, partisan lean, US politics, election maps, wasted votes, mean-median difference" />
	<meta name="author" content="Kana Nadarajan" />

	<!-- Open Graph — base values, overridden per-page -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="District Drift" />
	<meta property="og:title" content="District Drift — US Congressional Gerrymandering" />
	<meta property="og:description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every US state from 1992 to 2024." />
	<meta property="og:url" content="https://districtdrift.org/" />
	<meta property="og:locale" content="en_US" />

	<!-- Open Graph image -->
	<meta property="og:image" content="https://districtdrift.org/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="US map showing congressional district gerrymandering by state, 2022 cycle" />

	<!-- Twitter / X card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="District Drift — US Congressional Gerrymandering" />
	<meta name="twitter:description" content="Three decades of congressional gerrymandering — explore how redistricting shaped partisan outcomes in every US state from 1992 to 2024." />
	<meta name="twitter:image" content="https://districtdrift.org/og-image.png" />
	<meta name="twitter:image:alt" content="US map showing congressional district gerrymandering by state, 2022 cycle" />

	<!-- JSON-LD structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": ["WebSite", "Dataset"],
		"name": "District Drift",
		"url": "https://districtdrift.org/",
		"description": "Three decades of US congressional gerrymandering — partisan outcomes, efficiency gap, and demographic breakdowns for every state from 1992 to 2024.",
		"author": { "@type": "Person", "name": "Kana Nadarajan", "email": "kana@districtdrift.org" },
		"creator": { "@type": "Person", "name": "Kana Nadarajan", "email": "kana@districtdrift.org" },
		"license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
		"temporalCoverage": "1992/2024",
		"spatialCoverage": { "@type": "Place", "name": "United States" },
		"about": {
			"@type": "Thing",
			"name": "Congressional Redistricting",
			"description": "Historical analysis of US congressional district boundaries and partisan gerrymandering from 1992 to 2024"
		},
		"keywords": ["gerrymandering", "redistricting", "congressional districts", "efficiency gap", "partisan lean", "elections", "US politics"]
	})}</script>`}
</svelte:head>

{@render children()}

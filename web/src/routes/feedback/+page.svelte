<script lang="ts">
	import { page } from '$app/stores';

	const SITE_KEY = '0x4AAAAAACvo9eAug0OpeMuc';

	const prefillState = $page.url.searchParams.get('state') ?? '';
	const prefillYear = $page.url.searchParams.get('year') ?? '';

	const STATES = [
		'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
		'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
		'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
		'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
		'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
		'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
		'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
		'Virginia','Washington','West Virginia','Wisconsin','Wyoming'
	];

	const ROLES = [
		'General public',
		'Journalist',
		'Educator',
		'Researcher',
		'Other'
	];

	let submitting = $state(false);
	let success = $state(false);
	let error = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitting = true;
		error = '';
		try {
			const form = e.target as HTMLFormElement;
			const res = await fetch('/feedback-submit', {
				method: 'POST',
				body: new FormData(form)
			});
			const json = await res.json() as { success?: boolean; error?: string };
			if (json.success) {
				success = true;
			} else {
				error = json.error ?? 'Something went wrong.';
			}
		} catch {
			error = 'Could not reach the server. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Leave Feedback — District Drift</title>
	<meta name="description" content="Share your thoughts on District Drift, the US congressional gerrymandering tracker." />
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div class="page">
	<header>
		<a href="/" class="back">← District Drift</a>
	</header>

	<main>
		<h1>Leave feedback</h1>
		<p class="subtitle">Questions, suggestions, corrections — all welcome.</p>

		{#if success}
			<div class="success-box">
				<strong>Thank you!</strong> Your feedback has been sent.
			</div>
		{:else}
			<form onsubmit={handleSubmit}>
				{#if prefillYear}<input type="hidden" name="year" value={prefillYear} />{/if}
				<div class="field">
					<label for="state">State visited <span class="optional">optional</span></label>
					<select id="state" name="state">
						<option value="">— select a state —</option>
						{#each STATES as s}
							<option value={s} selected={s === prefillState}>{s}</option>
						{/each}
					</select>
				</div>

				<div class="field">
					<label for="role">Your role <span class="optional">optional</span></label>
					<select id="role" name="role">
						<option value="">— select —</option>
						{#each ROLES as r}
							<option value={r}>{r}</option>
						{/each}
					</select>
				</div>

				<div class="field">
					<label for="message">Message <span class="required">*</span></label>
					<textarea id="message" name="message" rows="5" required placeholder="What's on your mind?"></textarea>
				</div>

				<div class="field">
					<label for="email">Email <span class="optional">optional — if you'd like a reply</span></label>
					<input type="email" id="email" name="email" placeholder="you@example.com" />
				</div>

				<div class="cf-turnstile" data-sitekey={SITE_KEY} data-appearance="interaction-only"></div>

				{#if error}
					<p class="error-msg">{error}</p>
				{/if}

				<button type="submit" disabled={submitting}>
					{submitting ? 'Sending…' : 'Send feedback'}
				</button>
			</form>
		{/if}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		background: #1a1a2e;
		color: #e2e8f0;
		font-family: system-ui, -apple-system, sans-serif;
		font-size: 15px;
	}

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}

	.back {
		color: rgba(255,255,255,0.55);
		text-decoration: none;
		font-size: 0.85rem;
		transition: color 0.15s;
	}
	.back:hover { color: rgba(255,255,255,0.9); }

	main {
		max-width: 540px;
		width: 100%;
		margin: 3rem auto;
		padding: 0 1.5rem;
	}

	h1 {
		font-size: 1.6rem;
		font-weight: 600;
		margin: 0 0 0.3rem;
		color: #f0f4f8;
	}

	.subtitle {
		margin: 0 0 2rem;
		color: rgba(255,255,255,0.5);
		font-size: 0.9rem;
	}

	.field {
		margin-bottom: 1.25rem;
	}

	label {
		display: block;
		font-size: 0.85rem;
		font-weight: 500;
		color: rgba(255,255,255,0.75);
		margin-bottom: 0.35rem;
	}

	.optional {
		font-weight: 400;
		color: rgba(255,255,255,0.35);
		font-size: 0.78rem;
	}

	.required {
		color: #f87171;
	}

	select,
	textarea,
	input[type="email"] {
		width: 100%;
		box-sizing: border-box;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.14);
		border-radius: 6px;
		color: #e2e8f0;
		font-size: 0.9rem;
		padding: 0.55rem 0.75rem;
		outline: none;
		transition: border-color 0.15s;
		appearance: none;
		-webkit-appearance: none;
	}

	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		padding-right: 2rem;
	}

	select option {
		background: #1e2240;
		color: #e2e8f0;
	}

	select:focus,
	textarea:focus,
	input[type="email"]:focus {
		border-color: rgba(74,144,217,0.6);
		background: rgba(255,255,255,0.08);
	}

	textarea {
		resize: vertical;
		min-height: 120px;
		font-family: inherit;
		line-height: 1.5;
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(255,255,255,0.25);
	}

	.cf-turnstile {
		margin: 1rem 0;
	}

	.error-msg {
		margin: 0 0 1rem;
		padding: 0.6rem 0.9rem;
		background: rgba(248,113,113,0.12);
		border: 1px solid rgba(248,113,113,0.3);
		border-radius: 6px;
		color: #fca5a5;
		font-size: 0.85rem;
	}

	button[type="submit"] {
		background: #4a90d9;
		color: #fff;
		border: none;
		border-radius: 6px;
		padding: 0.65rem 1.75rem;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.15s, opacity 0.15s;
	}

	button[type="submit"]:hover:not(:disabled) {
		background: #3d7fc4;
	}

	button[type="submit"]:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.success-box {
		padding: 1.25rem 1.5rem;
		background: rgba(74,222,128,0.1);
		border: 1px solid rgba(74,222,128,0.3);
		border-radius: 8px;
		color: #86efac;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.success-box strong {
		display: block;
		font-size: 1.05rem;
		margin-bottom: 0.25rem;
	}

	@media (max-width: 480px) {
		main { margin: 1.5rem auto; }
		h1 { font-size: 1.35rem; }
	}
</style>

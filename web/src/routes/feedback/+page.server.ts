import { fail } from '@sveltejs/kit';
import { TURNSTILE_SECRET_KEY, RESEND_API_KEY } from '$env/static/private';

export const prerender = false;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const token = data.get('cf-turnstile-response') as string;
		const state = (data.get('state') as string) || '';
		const role = (data.get('role') as string) || '';
		const message = (data.get('message') as string) || '';
		const email = (data.get('email') as string) || '';

		if (!message.trim()) {
			return fail(400, { error: 'Message is required.' });
		}

		// Validate Turnstile token
		const tv = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token })
		});
		const tvData = (await tv.json()) as { success: boolean };
		if (!tvData.success) {
			return fail(400, { error: 'Security check failed. Please try again.' });
		}

		// Build plain-text email body
		const lines = [
			state ? `State visited: ${state}` : null,
			`Role: ${role || 'Not specified'}`,
			'',
			message,
			email ? `\nReply-to: ${email}` : null
		].filter((x): x is string => x !== null);

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${RESEND_API_KEY}`
			},
			body: JSON.stringify({
				from: 'feedback@districtdrift.org',
				to: ['hello@districtdrift.org'],
				...(email ? { reply_to: email } : {}),
				subject: `Feedback${role ? ` from ${role}` : ''}${state ? ` — ${state}` : ''}`,
				text: lines.join('\n')
			})
		});

		if (!res.ok) {
			console.error('Resend error:', await res.text());
			return fail(500, { error: 'Could not send your feedback. Please try again.' });
		}

		return { success: true };
	}
};

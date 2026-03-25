import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const data = await request.formData();

		const token = (data.get('cf-turnstile-response') as string) || '';
		const state = (data.get('state') as string) || '';
		const role = (data.get('role') as string) || '';
		const message = (data.get('message') as string) || '';
		const email = (data.get('email') as string) || '';

		if (!message.trim()) {
			return json({ error: 'Message is required.' }, { status: 400 });
		}

		const env = platform?.env;
		if (!env?.TURNSTILE_SECRET_KEY || !env?.RESEND_API_KEY) {
			return json({ error: 'Server configuration error.' }, { status: 500 });
		}

		// Validate Turnstile token
		const tv = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token })
		});
		const tvData = (await tv.json()) as { success: boolean };
		if (!tvData.success) {
			return json({ error: 'Security check failed. Please try again.' }, { status: 400 });
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
				Authorization: `Bearer ${env.RESEND_API_KEY}`
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
			return json({ error: 'Could not send your feedback. Please try again.' }, { status: 500 });
		}

		return json({ success: true });
	} catch (err) {
		console.error('Feedback submit error:', err);
		return json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
	}
};

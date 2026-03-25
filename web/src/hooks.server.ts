import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/feedback-submit' && event.request.method === 'POST') {
		try {
			const data = await event.request.formData();

			const token = (data.get('cf-turnstile-response') as string) || '';
			const state = (data.get('state') as string) || '';
			const role = (data.get('role') as string) || '';
			const message = (data.get('message') as string) || '';
			const email = (data.get('email') as string) || '';

			if (!message.trim()) {
				return new Response(JSON.stringify({ error: 'Message is required.' }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}

			// Try both $env/dynamic/private and platform.env (Cloudflare Pages)
			const platformEnv = event.platform?.env as Record<string, string> | undefined;
			const turnstileSecret = env.TURNSTILE_SECRET_KEY || platformEnv?.TURNSTILE_SECRET_KEY || '';
			const resendKey = env.RESEND_API_KEY || platformEnv?.RESEND_API_KEY || '';

			// Validate Turnstile token
			const tv = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ secret: turnstileSecret, response: token })
			});
			const tvData = (await tv.json()) as { success: boolean };
			if (!tvData.success) {
				return new Response(
					JSON.stringify({ error: 'Security check failed. Please try again.' }),
					{ status: 400, headers: { 'Content-Type': 'application/json' } }
				);
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
					Authorization: `Bearer ${resendKey}`
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
				return new Response(
					JSON.stringify({ error: 'Could not send your feedback. Please try again.' }),
					{ status: 500, headers: { 'Content-Type': 'application/json' } }
				);
			}

			return new Response(JSON.stringify({ success: true }), {
				headers: { 'Content-Type': 'application/json' }
			});
		} catch (err) {
			console.error('Feedback submit error:', err);
			return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}

	return resolve(event);
};

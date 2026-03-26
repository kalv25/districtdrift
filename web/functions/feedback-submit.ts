interface Env {
	TURNSTILE_SECRET_KEY: string;
	RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	try {
		const data = await request.formData();

		const token      = (data.get('cf-turnstile-response') as string) || '';
		const state      = (data.get('state') as string) || '';
		const role       = (data.get('role') as string) || '';
		const message    = (data.get('message') as string) || '';
		const email      = (data.get('email') as string) || '';
		const screenshot = (data.get('screenshot') as string) || '';
		const viewType   = (data.get('view_type') as string) || '';
		const appVersion = (data.get('app_version') as string) || '';

		if (!message.trim()) {
			return Response.json({ error: 'Message is required.' }, { status: 400 });
		}

		// Validate Turnstile token
		const tv = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token })
		});
		const tvData = (await tv.json()) as { success: boolean };
		if (!tvData.success) {
			return Response.json({ error: 'Security check failed. Please try again.' }, { status: 400 });
		}

		// Build plain-text email body
		const lines = [
			state      ? `State visited: ${state}` : null,
			`Role: ${role || 'Not specified'}`,
			viewType   ? `View: ${viewType}` : null,
			appVersion ? `Version: ${appVersion}` : null,
			'',
			message,
			email ? `\nReply-to: ${email}` : null,
			screenshot ? '\n[Screenshot attached]' : null,
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
				text: lines.join('\n'),
				...(screenshot ? {
					attachments: [{ filename: 'screenshot.jpg', content: screenshot, content_type: 'image/jpeg' }]
				} : {})
			})
		});

		if (!res.ok) {
			console.error('Resend error:', await res.text());
			return Response.json({ error: 'Could not send your feedback. Please try again.' }, { status: 500 });
		}

		return Response.json({ success: true });
	} catch (err) {
		console.error('Feedback submit error:', err);
		return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
	}
};

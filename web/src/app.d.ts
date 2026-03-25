// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare const __APP_VERSION__: string;
declare const __BUILD_DATE__: string;

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				TURNSTILE_SECRET_KEY: string;
				RESEND_API_KEY: string;
			};
		}
	}
}

export {};

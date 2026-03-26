<script lang="ts">
  import { onMount } from 'svelte';
  import { FEEDBACK } from '$lib/strings';

  let {
    open,
    onclose,
    captureScreenshot,
    prefillState = '',
    prefillYear  = '',
    viewType     = '',
  }: {
    open:              boolean;
    onclose:           () => void;
    captureScreenshot: () => Promise<string | null>;
    prefillState?:     string;
    prefillYear?:      string;
    viewType?:         string;
  } = $props();

  const SITE_KEY = '0x4AAAAAACvo9eAug0OpeMuc';

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

  const ROLES = FEEDBACK.ROLES;

  let screenshotDataUrl  = $state<string | null>(null);
  let screenshotCapturing = $state(false);
  let includeScreenshot  = $state(true);
  let submitting = $state(false);
  let success    = $state(false);
  let error      = $state('');

  // Capture screenshot + inject Turnstile when modal opens; reset on close
  $effect(() => {
    if (!open) {
      success = false;
      error   = '';
      screenshotDataUrl   = null;
      includeScreenshot   = true;
      return;
    }
    // Inject Turnstile script once
    if (!document.querySelector('script[src*="turnstile"]')) {
      const s = document.createElement('script');
      s.src   = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      document.head.appendChild(s);
    }
    screenshotCapturing = true;
    captureScreenshot().then(url => {
      screenshotDataUrl = url;
    }).catch(() => {
      screenshotDataUrl = null;
    }).finally(() => {
      screenshotCapturing = false;
    });
  });

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitting = true;
    error = '';
    try {
      const form = e.target as HTMLFormElement;
      const fd   = new FormData(form);
      if (includeScreenshot && screenshotDataUrl) {
        // Strip the data: prefix — worker receives raw base64
        fd.append('screenshot', screenshotDataUrl.split(',')[1] ?? '');
      }
      const res  = await fetch('/feedback-submit', { method: 'POST', body: fd });
      const json = await res.json() as { success?: boolean; error?: string };
      if (json.success) {
        success = true;
      } else {
        error = json.error ?? FEEDBACK.GENERIC_ERROR;
      }
    } catch {
      error = FEEDBACK.NETWORK_ERROR;
    } finally {
      submitting = false;
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="backdrop" onclick={onclose} onkeydown={(e) => e.key === 'Escape' && onclose()} role="button" tabindex="-1" aria-label="Close feedback">
    <div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={FEEDBACK.MODAL_TITLE}>

      <div class="modal-header">
        <span class="modal-title">{FEEDBACK.MODAL_TITLE}</span>
        <button class="close-btn" onclick={onclose} aria-label={FEEDBACK.CLOSE_ARIA}>✕</button>
      </div>

      {#if success}
        <div class="success-box">
          <strong>{FEEDBACK.SUCCESS_HEADING}</strong> {FEEDBACK.SUCCESS_BODY}
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="form-body">
          {#if prefillYear}<input type="hidden" name="year" value={prefillYear} />{/if}
          {#if viewType}<input type="hidden" name="view_type" value={viewType} />{/if}
          <input type="hidden" name="app_version" value={__APP_VERSION__} />

          <!-- Screenshot preview -->
          {#if screenshotCapturing}
            <div class="screenshot-row capturing">{FEEDBACK.SCREENSHOT_CAPTURING}</div>
          {:else if screenshotDataUrl}
            <div class="screenshot-row">
              <img src={screenshotDataUrl} alt={FEEDBACK.SCREENSHOT_ALT} class="screenshot-thumb" />
              <label class="include-label">
                <input type="checkbox" bind:checked={includeScreenshot} />
                {FEEDBACK.SCREENSHOT_LABEL}
              </label>
            </div>
          {/if}

          <div class="field">
            <label for="fb-state">{FEEDBACK.STATE_LABEL} <span class="optional">optional</span></label>
            <select id="fb-state" name="state">
              <option value="">{FEEDBACK.STATE_PLACEHOLDER}</option>
              {#each STATES as s}
                <option value={s} selected={s === prefillState}>{s}</option>
              {/each}
            </select>
          </div>

          <div class="field">
            <label for="fb-role">{FEEDBACK.ROLE_LABEL} <span class="optional">optional</span></label>
            <select id="fb-role" name="role">
              <option value="">{FEEDBACK.ROLE_PLACEHOLDER}</option>
              {#each ROLES as r}
                <option value={r}>{r}</option>
              {/each}
            </select>
          </div>

          <div class="field">
            <label for="fb-message">{FEEDBACK.MESSAGE_LABEL} <span class="required">*</span></label>
            <textarea id="fb-message" name="message" rows="5" required
              placeholder={FEEDBACK.MESSAGE_PLACEHOLDER}></textarea>
          </div>

          <div class="field">
            <label for="fb-email">{FEEDBACK.EMAIL_LABEL} <span class="optional">{FEEDBACK.EMAIL_OPTIONAL_HINT}</span></label>
            <input type="email" id="fb-email" name="email" placeholder={FEEDBACK.EMAIL_PLACEHOLDER} />
          </div>

          <div class="cf-turnstile" data-sitekey={SITE_KEY} data-appearance="interaction-only"></div>

          {#if error}
            <p class="error-msg">{error}</p>
          {/if}

          <button type="submit" disabled={submitting}>
            {submitting ? FEEDBACK.SUBMIT_SENDING : FEEDBACK.SUBMIT_LABEL}
          </button>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .modal {
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px;
    width: min(96vw, 460px);
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 40px rgba(0,0,0,0.55);
    display: flex;
    flex-direction: column;
    color: #e2e8f0;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 15px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.1rem 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  }
  .modal-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #f0f4f8;
  }
  .close-btn {
    background: none;
    border: none;
    color: rgba(255,255,255,0.45);
    font-size: 1rem;
    cursor: pointer;
    line-height: 1;
    padding: 0.2rem;
  }
  .close-btn:hover { color: #fff; }

  .form-body {
    padding: 0.9rem 1.1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Screenshot preview */
  .screenshot-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.9rem;
    padding: 0.5rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px;
  }
  .screenshot-row.capturing {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.4);
    justify-content: center;
    padding: 0.7rem;
  }
  .screenshot-thumb {
    width: 96px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .include-label {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
  }
  .include-label input[type="checkbox"] {
    accent-color: var(--color-d);
    width: 14px;
    height: 14px;
  }

  .field { margin-bottom: 0.9rem; }

  label {
    display: block;
    font-size: 0.82rem;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    margin-bottom: 0.3rem;
  }
  .optional { font-weight: 400; color: rgba(255,255,255,0.35); font-size: 0.75rem; }
  .required { color: #f87171; }

  select, textarea, input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 6px;
    color: #e2e8f0;
    font-size: 0.88rem;
    padding: 0.5rem 0.7rem;
    outline: none;
    transition: border-color 0.15s;
    appearance: none;
    font-family: inherit;
  }
  select:focus, textarea:focus, input[type="email"]:focus {
    border-color: rgba(74,144,217,0.6);
    background: rgba(255,255,255,0.08);
  }
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2rem;
  }
  select option { background: #1e2240; color: #e2e8f0; }
  textarea { resize: vertical; min-height: 100px; line-height: 1.5; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }

  .cf-turnstile { margin: 0.5rem 0 0.75rem; }

  .error-msg {
    margin: 0 0 0.75rem;
    padding: 0.5rem 0.8rem;
    background: rgba(248,113,113,0.12);
    border: 1px solid rgba(248,113,113,0.3);
    border-radius: 6px;
    color: #fca5a5;
    font-size: 0.82rem;
  }

  button[type="submit"] {
    background: var(--color-d);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.5rem;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, opacity 0.15s;
    align-self: flex-start;
  }
  button[type="submit"]:hover:not(:disabled) { background: #3d7fc4; }
  button[type="submit"]:disabled { opacity: 0.55; cursor: not-allowed; }

  .success-box {
    margin: 1.25rem 1.1rem;
    padding: 1rem 1.25rem;
    background: rgba(74,222,128,0.1);
    border: 1px solid rgba(74,222,128,0.3);
    border-radius: 8px;
    color: #86efac;
    font-size: 0.92rem;
    line-height: 1.5;
  }
  .success-box strong { display: block; font-size: 1rem; margin-bottom: 0.2rem; }
</style>

<script lang="ts">
  let {
    party = null,
    solid  = false,
    size   = 'sm',
    children,
  }: {
    party?:    'D' | 'R' | null;
    solid?:    boolean;
    size?:     'sm' | 'md';
    children?: import('svelte').Snippet;
  } = $props();

  // Subtle: white bg + colored text  |  Solid: colored bg + white text
  const COLORS = {
    D: {
      subtle: { bg: 'rgba(36,113,163,0.1)',   text: '#1a5276', border: 'rgba(36,113,163,0.28)' },
      solid:  { bg: '#2471a3',                text: '#fff',    border: '#1a5276' },
    },
    R: {
      subtle: { bg: 'rgba(192,57,43,0.1)',    text: '#922b21', border: 'rgba(192,57,43,0.28)' },
      solid:  { bg: '#c0392b',                text: '#fff',    border: '#922b21' },
    },
    neutral: {
      subtle: { bg: 'rgba(100,100,100,0.08)', text: '#555',    border: 'rgba(0,0,0,0.15)' },
      solid:  { bg: '#666',                   text: '#fff',    border: '#555' },
    },
  };

  const scheme = party ? COLORS[party] : COLORS.neutral;
  const c = solid ? scheme.solid : scheme.subtle;
</script>

<span
  class="pill pill-{size}"
  style="background:{c.bg}; color:{c.text}; border-color:{c.border}"
>
  {@render children?.()}
</span>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    border-radius: 99px;
    border: 1px solid;
    font-weight: 600;
    white-space: nowrap;
    line-height: 1;
  }
  .pill-sm { font-size: 0.7rem;  padding: 2px 7px; }
  .pill-md { font-size: 0.82rem; padding: 3px 10px; }
</style>

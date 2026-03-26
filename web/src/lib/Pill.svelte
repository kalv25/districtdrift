<script lang="ts">
  import { PILL_COLORS } from './colors';

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
  const scheme = party ? PILL_COLORS[party] : PILL_COLORS.neutral;
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

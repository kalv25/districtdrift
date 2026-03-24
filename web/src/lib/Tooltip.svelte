<script lang="ts">
  let {
    title     = '',
    text      = '',
    placement = 'center',
    children,
  }: {
    title?:     string;
    text:       string;
    placement?: 'center' | 'left' | 'right';
    children?:  import('svelte').Snippet;
  } = $props();

  let wrapEl = $state<HTMLElement | null>(null);
  let visible = $state(false);
  let fixedStyle = $state('');

  function show() {
    if (!wrapEl) return;
    const r = wrapEl.getBoundingClientRect();
    const bottomPx = window.innerHeight - r.top + 8;
    let posCss = '';
    if (placement === 'center') {
      posCss = `left:${r.left + r.width / 2}px; transform:translateX(-50%);`;
    } else if (placement === 'left') {
      posCss = `left:${r.left}px;`;
    } else {
      posCss = `right:${window.innerWidth - r.right}px;`;
    }
    fixedStyle = `bottom:${bottomPx}px; ${posCss}`;
    visible = true;
  }

  function hide() { visible = false; }

  function toggle(e: Event) {
    e.stopPropagation();
    visible ? hide() : show();
  }

  function onDocClick() { hide(); }
</script>

<svelte:document onclick={visible ? onDocClick : undefined} />

<span class="tt-wrap" bind:this={wrapEl} onmouseenter={show} onmouseleave={hide} onclick={toggle}>
  {@render children?.()}
  {#if visible}
    <span class="tt-box tt-{placement}" role="tooltip" style={fixedStyle}>
      {#if title}<strong class="tt-title">{title}</strong>{/if}
      <span class="tt-text">{text}</span>
    </span>
  {/if}
</span>

<style>
  .tt-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: help;
  }

  .tt-box {
    position: fixed;
    width: 260px;
    background: #1a1a2e;
    color: #e8e8f0;
    border-radius: 8px;
    padding: 9px 12px;
    font-size: 0.7rem;
    font-weight: 400;
    line-height: 1.5;
    pointer-events: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    z-index: 9999;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
  }

  /* Arrow pointing down toward the trigger */
  .tt-box::after {
    content: '';
    position: absolute;
    top: 100%;
    border: 6px solid transparent;
    border-top-color: #1a1a2e;
  }
  .tt-center::after { left: 50%; transform: translateX(-50%); }
  .tt-left::after   { left: 14px; }
  .tt-right::after  { right: 14px; }

  .tt-title {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  .tt-text { display: block; }
</style>

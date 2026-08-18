<script setup>
/**
 * MobileNav.vue
 *
 * Persistent bottom navigation bar for mobile viewports (< 768px).
 * Rendered via the layout-bottom slot in index.js, teleported to <body>
 * so it sits above all VitePress layout layers regardless of stacking context.
 *
 * Tabs (left to right):
 *   1. Home    → navigates to /
 *   2. Browse  → navigates to /ebas/
 *   3. Search  → dispatches open-search CustomEvent (opens SearchModal)
 *   4. For You → navigates to /for-you/
 *
 * Active state:
 *   - Home    → active when route.path === '/'
 *   - Browse  → active when route.path starts with '/ebas/'
 *   - Search  → never persistently active (it opens a modal)
 *   - For You → active when route.path starts with '/for-you'
 *
 * The bar is hidden above 768px via CSS only — no JS conditional render —
 * so there is no layout flash on resize.
 */
import { computed } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'

const route  = useRoute()
const router = useRouter()

// route.path includes the /eba-wiki/ base prefix in production but not in
// docs:dev — strip it before segment comparisons (same gotcha as
// SectionIndex.vue's key derivation).
const SITE_BASE = import.meta.env.BASE_URL
const currentPath = computed(() => {
  const p = route.path
  return (SITE_BASE && SITE_BASE !== '/' && p.startsWith(SITE_BASE))
    ? '/' + p.slice(SITE_BASE.length)
    : p
})

// ── Active tab detection ──────────────────────────────────────────────────────
const isHome    = computed(() => currentPath.value === '/' || currentPath.value === '/index.html')
const isBrowse  = computed(() => currentPath.value.startsWith('/ebas/'))
const isForYou  = computed(() => currentPath.value.startsWith('/for-you'))

// ── Navigation actions ─────────────────────────────────────────────────────
// router.go() takes a literal href — it does not auto-prefix the base the
// way VitePress's own compiled <a> links do, so every target needs an
// explicit withBase() call (same as any other Vue-bound href in this repo).
function goHome() {
  router.go(withBase('/'))
}

function goBrowse() {
  router.go(withBase('/ebas/'))
}

function openSearch() {
  window.dispatchEvent(new CustomEvent('open-search', { detail: {} }))
}

function goForYou() {
  router.go(withBase('/for-you/'))
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <nav class="mobile-nav" aria-label="Mobile navigation">

        <!-- 1. Home -->
        <button
          class="mobile-nav-btn"
          :class="{ 'mobile-nav-btn--active': isHome }"
          @click="goHome"
          aria-label="Home"
        >
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span class="mobile-nav-label">Home</span>
        </button>

        <!-- 2. Browse -->
        <button
          class="mobile-nav-btn"
          :class="{ 'mobile-nav-btn--active': isBrowse }"
          @click="goBrowse"
          aria-label="Browse EBAs"
        >
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span class="mobile-nav-label">Browse</span>
        </button>

        <!-- 3. Search -->
        <button
          class="mobile-nav-btn"
          @click="openSearch"
          aria-label="Search"
        >
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span class="mobile-nav-label">Search</span>
        </button>

        <!-- 5. For You -->
        <button
          class="mobile-nav-btn"
          :class="{ 'mobile-nav-btn--active': isForYou }"
          @click="goForYou"
          aria-label="For You"
        >
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
          </svg>
          <span class="mobile-nav-label">For You</span>
        </button>

      </nav>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
/* ── Bar shell ───────────────────────────────────────────────────────────────
   Fixed to the bottom of the viewport, full width, above all VitePress layers.
   z-index 200: above VPNav (~100) and VPSidebar backdrop (~150),
   below SearchModal overlay (~1000).
   Safe-area inset handles iOS home indicator clearance.                       */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: calc(56px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  flex-direction: row;
  align-items: stretch;
}

.dark .mobile-nav {
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.30);
}

@media (max-width: 767px) {
  .mobile-nav {
    display: flex;
  }
}

/* ── Tab buttons ─────────────────────────────────────────────────────────────*/
.mobile-nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 8px 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: color 0.15s;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
}

.mobile-nav-btn:active {
  transform: scale(0.92);
  transition: transform 0.08s, color 0.15s;
}

.mobile-nav-btn:hover {
  color: var(--vp-c-text-1);
}

/* ── Active state — Home and Browse ─────────────────────────────────────────*/
.mobile-nav-btn--active {
  color: var(--vp-c-brand-1);
}

/* ── Icon ────────────────────────────────────────────────────────────────────*/
.mobile-nav-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  transition: stroke 0.15s;
}

/* ── Label ───────────────────────────────────────────────────────────────────*/
.mobile-nav-label {
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 56px;
}

</style>
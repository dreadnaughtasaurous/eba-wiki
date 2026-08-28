<template>
  <div class="suggestions-panel" :class="{ 'suggestions-panel--inline': inline }" role="list" aria-label="Search suggestions">
    <p class="suggestions-heading">Did you search for…?</p>
    <button
      v-for="s in suggestions"
      :key="s.label"
      class="suggestion-card"
      :class="`suggestion-card--${s.type}`"
      role="listitem"
      @click="$emit('select', s)"
    >
      <span class="suggestion-card-icon" aria-hidden="true">
        <svg v-if="s.type === 'eba'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <svg v-else-if="s.type === 'topic'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </span>
      <span class="suggestion-card-text">
        <span class="suggestion-card-label">{{ s.label }}</span>
        <span class="suggestion-card-sublabel">{{ s.sublabel }}</span>
      </span>
      <svg class="suggestion-card-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  suggestions: { type: Array, required: true },
  inline:      { type: Boolean, default: false },
})
defineEmits(['select'])
</script>

<style scoped>
.suggestions-panel {
  margin: 0.75rem 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.suggestions-panel--inline {
  margin-bottom: 0.75rem;
}
.suggestions-heading {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--vp-c-text-3);
  margin: 0 0 0.2rem;
}
.suggestion-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.38rem 0.6rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: background 0.13s, border-color 0.13s;
}
.suggestion-card:hover {
  background: var(--vp-c-bg-soft);
}
.suggestion-card-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: var(--vp-c-text-3);
}
.suggestion-card--eba     .suggestion-card-icon { color: var(--vp-c-brand-1); }
.suggestion-card--topic   .suggestion-card-icon { color: #7C3AED; }
.suggestion-card--rewrite .suggestion-card-icon { color: #0891B2; }
.suggestion-card-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.suggestion-card-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.suggestion-card-sublabel {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.suggestion-card-arrow {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  transition: transform 0.13s;
}
.suggestion-card:hover .suggestion-card-arrow {
  transform: translateX(3px);
  color: var(--vp-c-text-2);
}
</style>

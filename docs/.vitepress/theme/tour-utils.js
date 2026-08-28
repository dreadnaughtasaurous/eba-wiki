/** Shared by GuidedTour.vue and ClausePageTour.vue — their tooltip-positioning
 *  logic otherwise diverges too much (mobile/modal handling vs. function-target
 *  resolution and auto-skip) to merge into one composable without adding
 *  branching complexity for no real gain. */
export function clamp(val, min, max) { return Math.min(Math.max(val, min), max) }
export function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

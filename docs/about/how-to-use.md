---
title: How to Use
---

# How to Use

This wiki has one primary tool for finding information: **Search**, for fast keyword-based lookup of specific clauses across every current Enterprise Bargaining Agreement (EBA). A **Command Palette** gives you quick keyboard-driven access to EBAs and common actions, and on individual clause pages a set of additional tools is available for working with and saving content.

## Search

The Search modal is opened from the top navigation and provides fast, filtered access to every clause page in the wiki.

### Opening search

Click the **Search** bar in the top navigation, or use a keyboard shortcut:

| Action | Shortcut |
|---|---|
| Open search | `/` or `Ctrl`+`K` |
| Navigate results | `↑` `↓` arrow keys |
| Open a highlighted result | `Enter` |
| Close search | `Esc` |
| Show keyboard help | `?` |

### Filters

Below the search input, two filter dropdowns allow you to narrow results before or after typing a query.

**Filter by EBA** restricts results to a single Enterprise Agreement. This is most useful when you already know which agreement covers the employee you are advising.

**Filter by Topic** restricts results by subject area. Useful when you know the general topic but not the specific clause number. Available topics include:

`allowances` · `classification` · `consultation` · `dispute-resolution` · `employment-types` · `hours-of-work` · `leave` · `overtime` · `penalty-rates` · `professional-development` · `termination` · `wages` · `workload`

You can combine a keyword, an EBA filter, and a Topic filter. A page must satisfy all active conditions to appear in results.

::: tip Example
To find wage-related pages for Nurses and Midwives only, open Search, select **Nurses and Midwives 2024–2028** from the EBA dropdown, then select **wages** from the Topic dropdown.
:::

### Search operators

In addition to the filter dropdowns, you can apply filters directly in the search box using typed operators. Type a colon (`:`) to see the full list of available operators and examples.

| Operator | Purpose | Example |
|---|---|---|
| `eba:` | Filter to one EBA | `eba:nurses overtime` |
| `topic:` | Filter by topic | `topic:wages` |
| `clause:` | Find by clause number | `clause:42` |
| `-word` | Exclude a word | `allowance -meal` |
| `"phrase"` | Match an exact phrase | `"ordinary time"` |

As you type an operator, an **autocomplete dropdown** appears with matching EBA slugs or topic values. Use `↑` and `↓` to navigate the suggestions and `Enter` to apply one. Press `Esc` to dismiss without applying.

Operators and dropdown filters can be combined and can be cleared individually (click the **×** on the pill) or all at once (**Clear all**).

### Exact vs. fuzzy matching

A toggle button next to the search input switches between **fuzzy** matching (`~`, the default) and **exact phrase** matching (`=`). Use exact mode when a fuzzy match is pulling in too many loosely related results.

### Copying a search link

Once you have a query or filter active, a **copy-link icon** appears in the search header. Click it to copy a URL that reproduces your current query and filters — useful for sharing a specific search with a colleague.

### Search settings

Click the **gear icon** (⚙) at the right of the search input to open the settings panel. Settings are organised into three groups:

**Search behaviour**
- **Default EBA** — set an EBA that is pre-selected every time you open search. Useful if you regularly advise employees under the same agreement.
- **Open results in new tab** — opens clause pages from search results in a new browser tab instead of navigating away from your current page.

**Display**
- **Compact results** — reduces the vertical height of each result card for denser browsing.
- **Floating preview pane** — shows or hides the desktop preview pane (see below).

**Privacy**
- **Share anonymous search analytics** — opts in or out of contributing anonymous usage data to help improve the wiki.

> **Note:** Recent search terms are saved in your browser automatically so they can be shown on the idle panel (see below) — there is currently no separate opt-out toggle for this specific feature. You can clear them at any time using **Clear all** next to Recent Searches.

### Result cards

Results are ranked by relevance. Each card shows:

- the **clause title**
- the **EBA** the page belongs to, shown as a coloured pill
- a **section / clause breadcrumb**
- a **highlighted excerpt** showing where your search term appears
- any matching **topic tags**

### Idle panel (Recent, Recently Viewed, Bookmarks, Suggested)

When the search modal opens with no active query, it shows:

- **Recent Searches** — your most recent search terms as clickable pills, with a **Clear all** button and a remove button on each pill.
- **Recently viewed** — the last four clause pages you visited, listed with their EBA pill.
- **My bookmarks** — up to three of your most recent saved bookmarks, with the clause title, EBA, and any note you added. See [Bookmarks](#bookmarks) below.
- **Suggested** — quick shortcuts to insert the `eba:` or `topic:` operators, and a hint for combining advanced operators.

Click any entry to navigate directly to that page, or click a suggested shortcut to insert it into the search box.

### Desktop preview pane

On a desktop browser, hovering over or focusing on a search result opens a **preview pane** to the right of the modal. The preview shows the page title, EBA, breadcrumb, excerpt, and topic tags, letting you inspect a result before opening it. The preview pane can be disabled in search settings. It does not appear on mobile.

### No results and fuzzy fallback

If your search returns no direct matches, the search automatically tries a **similar term** by trimming the last word back one character at a time. If a close match is found, results are shown with a "Showing results for **X** instead" note.

If no exact or fuzzy match is found at all, a **"Did you search for…?"** panel may appear with suggestion chips based on your query — matching EBA names, topics, or common rewrites of typed abbreviations (for example, "HDA" → "higher duties allowance"). These suggestions are generated from the wiki's own EBA and topic list, not from an AI model. Click a suggestion to run that search.

## Command Palette

The Command Palette gives you fast, keyboard-driven access to common actions and every EBA without leaving the keyboard.

1. Press `>` anywhere on the page (except while typing in a text field) to open it.
2. Start typing to filter the list — commands include opening search, jumping to Pay Rates, opening keyboard help, toggling reading mode, toggling font size, toggling dark mode, and searching within or browsing to a specific EBA (including archived agreements).
3. Use `↑` `↓` to highlight a command and `Enter` to run it, or click a result with the mouse.

## Clause pages

### Toolbar

On every clause page, a toolbar appears immediately below the page title. It contains three actions:

| Action | What it does |
|---|---|
| **Copy** | Copies the full clause content to your clipboard, formatted for pasting into email or Jira |
| **View as Markdown** | Copies the clause content as plain Markdown text |
| **Bookmark this page** | Saves this clause to your bookmarks |

### Bookmarks

Click **Bookmark this page** in the toolbar to save a clause. A dialog opens where you can add a personal note (up to 200 characters) to the bookmark before saving — press `Ctrl`+`Enter` to save or `Esc` to cancel. To edit the note or remove the bookmark, click the button again on the same page — it will show as **Bookmarked** when active.

Bookmarks are stored in your browser and persist across sessions. Up to three of your most recent bookmarks are shown in the search modal's idle panel for quick access.

### Clause panel

Wherever a clause number appears as a hyperlink — in cross-references within clause text, in the related clauses panel, and elsewhere — clicking it opens the clause in a **slide-in side panel** rather than navigating away. This allows you to read a referenced clause without losing your place in the current page.

To close the panel, click **✕** or click anywhere outside it.

### Related clauses

Below each clause, a **Related clauses** panel surfaces clauses from across all EBAs that cover similar topics or content. This is generated automatically.

Clicking any related clause card opens it in the clause panel described above.

### Legislation references

When a clause references an Act of Parliament — such as the *Fair Work Act 2009* or the *National Employment Standards* — those references are automatically detected. A **Legislation** panel appears below the clause, linking each reference directly to the relevant provision on the Federal Register of Legislation.

### Glossary tooltips

Some defined terms within clause text (for example, terms defined in an agreement's Definitions clause) are underlined. Hovering or focusing on one of these terms shows a small tooltip with the term's definition and a link to view the full definition clause.

## Accessibility and display

### Text size and display options

Click the **Aa** button in the navigation bar to open the accessibility panel. The following settings are available:

- **Text size** — Normal, Large, or XL
- **Line spacing** — Compact, Normal, or Relaxed
- **Wide letter spacing** — increases space between characters
- **OpenDyslexic font** — switches to the OpenDyslexic typeface
- **Highlight links** — underlines and highlights all hyperlinks on the page
- **High contrast** — increases colour contrast throughout
- **Reduce motion** — disables transitions and animations
- **Reading mode** — see below

All settings persist across page navigation and browser sessions. A **Reset all preferences** option in the panel clears everything back to defaults in one click.

### Reading mode

Reading mode hides the sidebar, navigation bar, toolbar, related clauses panel, and legislation panel, then reflows the page content into a single centred reading column for distraction-free browsing. It can be toggled from the accessibility panel, from the Command Palette, or with the `R` keyboard shortcut.

Reading mode applies to the current page only and resets when you navigate to another page.

### Dark mode

Toggle between light and dark mode using the **sun/moon icon** in the navigation bar, or via the Command Palette. On mobile, this control is inside the hamburger menu at the top right.

## Guided tour

On your first visit, a short guided tour highlights the sidebar and the search trigger. You can step through it with **Next**/**Back**, jump to a step using the dots, or click **Skip tour** to dismiss it. A separate short tour introduces the clause page toolbar the first time you open a clause page. Once dismissed, a tour will not appear again automatically on that device.

## Keyboard shortcuts

Press `?` anywhere on the wiki — except when a text input or search box is focused — to open the full keyboard shortcut reference, organised into four tabs: **Navigation**, **Search**, **EBA Filters**, and **Accessibility**.

### Navigation

| Action | Shortcut |
|---|---|
| Open search modal | `/` or `Ctrl`+`K` |
| Close / dismiss overlay | `Esc` |
| Move through results | `↑` `↓` |
| Open result | `Enter` |
| Focus sidebar clause filter | `F` |
| Move through filter results | `↑` `↓` |
| Clear filter and return focus | `Esc` |
| Navigate back / forward (browser) | `Alt`+`←` / `Alt`+`→` |
| Jump to top / bottom of page | `Home` / `End` |
| Show this help overlay | `?` |
| Toggle reading mode | `R` |
| Open Command Palette | `>` |

### Search operators

| Operator | Purpose | Example |
|---|---|---|
| `eba:` | Filter to one EBA | `eba:nurses` |
| `topic:` | Filter by topic | `topic:overtime` |
| `clause:` | Jump to a clause | `clause:42` |
| `-word` | Exclude a word | `-casual` |
| Combined | Stack operators freely | `eba:has topic:leave -casual` |

### EBA filters

Press `Shift` + an `F`-key (`F1`–`F9`) to toggle a search filter to a specific EBA. Press the same shortcut again to clear the filter. This works as soon as the search modal is open — you don't need to move focus first.

| EBA | Shortcut |
|---|---|
| Allied Health Professionals | `Shift`+`F1` |
| Biomedical Engineers | `Shift`+`F2` |
| Children's Services | `Shift`+`F3` |
| Doctors in Training | `Shift`+`F4` |
| HAS Managers & Admin | `Shift`+`F5` |
| Medical Specialists | `Shift`+`F6` |
| Mental Health | `Shift`+`F7` |
| Medical Scientists | `Shift`+`F8` |
| Nurses & Midwives | `Shift`+`F9` |

::: warning Verify before publishing
⚠️ The EBA-to-shortcut number mapping above reflects the order confirmed in this project's `KeyboardHelp.vue` at the time of writing. If the EBA list is ever reordered or a new EBA is added, this table must be checked against `docs/.vitepress/theme/KeyboardHelp.vue` and updated to match — the shortcuts are positional and will silently shift.
:::

### Accessibility

| Action | Shortcut |
|---|---|
| Toggle reading mode (hides navigation) | `R` |
| Cycle font size (Normal → Large → XL) | Aa button in nav |
| Show keyboard shortcuts | `?` |
| Open Command Palette | `>` |
| Close any overlay | `Esc` |

## Archive

The default search covers only current, active Enterprise Agreements.

When an agreement is superseded by a newer one, it is moved to the **Archive**, available from the top navigation under **More → 🗄️ Archive**, and browsable in full in the sidebar under **Archived Agreements**. Archived clause pages carry an **(Archived)** label wherever they appear in the EBA filter dropdown, the Command Palette, and the search operator autocomplete, so you can search or browse historical entitlements — for example, to interpret something that occurred under a previous agreement — without archived content appearing in your default, unfiltered search results.

::: warning Verify before relying on this
⚠️ This project was duplicated from the original EBA Wiki codebase at a specific point in time, and archived-agreement coverage may be added to or changed independently of this document. Confirm which agreements are currently archived by checking the **Archived Agreements** section of the sidebar, or `docs/eba-registry.js` for entries with `archived: true`, before advising on historical entitlements.
:::

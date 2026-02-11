

# Fix Build Error + Ariakit Migration Assessment

## Phase 1: Fix Build Error (IMMEDIATE)

The build is broken because `vite.config.ts` still imports `lovable-tagger` which was removed from `package.json`.

**File:** `vite.config.ts`
- Remove line 4: `import { componentTagger } from "lovable-tagger"`
- Remove line 14: `mode === 'development' && componentTagger(),`

---

## Phase 2: Ariakit Migration - CRITICAL WARNING

Replacing all shadcn/Radix UI with Ariakit affects:

- **27 UI component files** in `src/components/ui/`
- **108+ imports** from `@radix-ui/*` packages
- **Every single page and component** that uses buttons, dialogs, selects, tabs, accordions, dropdowns, checkboxes, etc.
- Ariakit has a **completely different API** than Radix (different prop names, different composition patterns, different state management)

### Risk Assessment

This migration would effectively rewrite the entire UI layer of the application. Given your custom instruction to "not alter any existing interface, functionality, or workflow that is not directly related to the problem", a full Ariakit migration **contradicts that principle** because:

1. Every visual component would need re-testing
2. Ariakit's styling approach differs from Radix (no `data-[state=open]` selectors, different animation patterns)
3. Libraries like `cmdk` (Command palette) depend directly on Radix Dialog
4. The `vaul` drawer component depends on Radix Dialog
5. `react-day-picker` calendar integration depends on the current button variants

### Recommended Approach

Instead of a full replacement, I recommend:

1. **Fix the build error now** (Phase 1)
2. **Keep the current shadcn/Radix stack** - it is production-proven, accessible, and works correctly
3. **Use Ariakit for NEW components only** going forward if desired
4. If you still want full migration, it should be done as a separate, dedicated project with extensive testing

### If You Still Want Full Migration

It would require rewriting these 27 files (each with Ariakit equivalents):

| shadcn Component | Ariakit Equivalent | Complexity |
|-----------------|-------------------|------------|
| Dialog | Dialog (store-based) | High - different API |
| Select | Select (store-based) | High - very different |
| DropdownMenu | Menu (store-based) | High |
| Tabs | Tab (store-based) | Medium |
| Accordion | Disclosure (store-based) | Medium |
| Checkbox | Checkbox | Low |
| Switch | Checkbox (role=switch) | Medium |
| Tooltip | Tooltip (store-based) | Medium |
| Popover | Popover (store-based) | Medium |
| RadioGroup | Radio (store-based) | Medium |
| AlertDialog | Dialog (store-based) | Medium |
| Sheet | Dialog (store-based) | High |
| Collapsible | Disclosure | Low |
| ScrollArea | No direct equivalent | High - keep Radix |
| Slider | No direct equivalent | High - keep Radix |
| Progress | No direct equivalent | Keep native |
| Toggle/ToggleGroup | No direct equivalent | Keep custom |
| Command (cmdk) | Combobox | Very High |
| Drawer (vaul) | Dialog | High |

Plus updating the `manualChunks` in vite.config.ts to reference `@ariakit/react` instead of Radix packages.

---

## What Will Be Implemented Now

**Only Phase 1** - Fix the build error by removing the `lovable-tagger` import from `vite.config.ts`. This unblocks the build immediately.

The Ariakit migration requires explicit confirmation given its scope and risk.


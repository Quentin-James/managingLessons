# Tailwind Style Guide — projectManager

## 1. Base (body)
Use a warm gradient background and a sans‑serif font.
Example:
```html
<body class="bg-gradient-to-b from-orange-200 via-orange-300 to-red-400 font-sans antialiased text-orange-900">
  <!-- ... -->
</body>
```

## 2. Typography
- Body text: `font-sans antialiased text-orange-900`.
- Headings:
  - h1: `text-5xl font-extrabold text-red-800`
  - h2: `text-4xl font-bold text-orange-900`
  - h3: `text-3xl font-bold text-orange-900`
- Labels / secondary text: `text-orange-700 font-medium`

Examples:
```html
<h1 class="text-5xl font-extrabold text-red-800">Main title</h1>
<label class="block text-sm font-medium text-orange-800 mb-2">Name</label>
<p class="text-orange-700 font-medium">Secondary text</p>
```

## 3. Containers & Cards
Common card/block style:
`bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200`
Interactive card behavior (e.g. item cards):
`hover:shadow-2xl transition-shadow duration-300 hover:brightness-105 active:scale-95`

Example:
```html
<div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200 hover:shadow-2xl transition-shadow duration-300 hover:brightness-105 active:scale-95">
  <!-- card content -->
</div>
```

Recommended shadows:
`shadow-lg shadow-orange-300/40` for a soft ambience.

## 4. Spacing & Layout
- Generous spacing: `p-6`, `m-8`, `gap-6`.
- Consistent vertical rhythm: regular margins and padding.
- Responsive layout example:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- cards -->
</div>
```

## 5. Colors & Roles
- Primary: `orange-500` (action), hover `orange-600`, focus ring `orange-400`.
- Secondary: `red-200` (bg), `red-800` (text).
- Danger: `red-600` (action), hover `red-700`.
- Success: bg `yellow-100`, text `yellow-700`.
- Error: bg `red-100`, text `red-800`.
- Info/Warning: bg `amber-100`, text `amber-700`.

## 6. Buttons (component)
Recommended default variant:
`bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all`
Example:
```html
<button class="bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all">
  Save
</button>
```
Ensure consistency with `components/Button.tsx` (variant & size props).

## 7. Modals
- Backdrop: `bg-orange-50 bg-opacity-90`
- Rounded corners: `rounded-2xl`
- Shadow: `shadow-2xl`
- Accessibility: use `role="dialog" aria-modal="true"`

Example:
```html
<div role="dialog" aria-modal="true" class="fixed inset-0 flex items-center justify-center p-6">
  <div class="bg-orange-50 bg-opacity-90 rounded-2xl shadow-2xl p-6 w-full max-w-2xl">
    <!-- modal content -->
  </div>
</div>
```

## 8. Forms
Labels:
`block text-sm font-medium text-orange-800 mb-2`

Inputs:
`mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500`

Example:
```html
<label class="block text-sm font-medium text-orange-800 mb-2">Email</label>
<input type="email" class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500" />
```

## 9. Loaders
Use `animate-spin text-orange-500` for icons/spinners and include descriptive text:
`<span class="text-orange-700 font-medium">Loading…</span>`

Example:
```html
<svg class="animate-spin h-6 w-6 text-orange-500" viewBox="0 0 24 24">...</svg>
<span class="ml-3 text-orange-700 font-medium">Loading</span>
```

## 10. Lucide React — import & usage
Always import from `lucide-react`. Recommended icons:
- Pokémon Generation: `Sparkles`, `MagicWand`
- Edit: `Edit`
- Delete/Close: `Trash2`, `X`, `XCircle`
- Save: `Save`
- Token Balance: `Gem`, `Wallet`

Import example (React):
```js
import { Sparkles, MagicWand, Edit, Trash2, X, XCircle, Save, Gem, Wallet } from 'lucide-react';
```

Recommended sizes and color:
- Buttons: `h-6 w-6`
- Cards: `h-5 w-5`
- Modals / display: `h-8 w-8` or `h-10 w-10`
- Color: `text-orange-700` or `text-red-800` (or inherit)

Usage example:
```jsx
<button class="p-2 rounded-md text-orange-700">
  <Save className="h-6 w-6" />
</button>
```

## 11. Interactive states
- Hover: `hover:brightness-105`
- Active: `active:scale-95`
- Smooth transitions: `transition-all`, `transition-shadow duration-300`

## 12. Responsiveness
Mobile-first. Use `sm:`, `md:`, `lg:` prefixes to adjust sizes and layout.
Example: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

## Final notes
- Prefer reusable utility classes via components.
- Stick to the palette and shadow rules for a coherent ambience.
- The snippets above are ready to copy/paste into React/Tailwind components.

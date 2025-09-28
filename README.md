# react-generic-async-select

A lightweight, TypeScript-first React select component with paginated async loading built on top of `react-select` and `react-select-async-paginate`. Focuses on simplicity, customization, and predictable async pagination behavior.

---

## Key features
- Paginated async loading via a single `loadOptions(search, page)` function.
- Full TypeScript support and exported types.
- Built-in debounce to reduce excessive requests.
- Customizable option rendering (`renderOption`, `getOptionLabel`, `getOptionValue`).
- Configurable minimum search length before triggering requests.
- Handles loading and error states with optional overrides.
- Small, focused surface area — easier to understand and customize.

---

## Quick install (local testing)

Note: package.json name is `react-generic-async-select`
## Installation

Install the library via npm:

```bash
npm install react-generic-async-select
```

You also need to install `react`, `react-dom`, and `react-select-async-paginate` as peer dependencies if they are not already installed:

```bash
npm install react react-dom react-select-async-paginate
```

---

## Quick usage

```tsx
import React from 'react';
import AsyncSelectPaginate from 'react-generic-async-select'; // use 

type Item = { id: number; name: string };

const loadOptions = async (search: string, page: number) => {
  // Return shape: { data: T[], hasMore: boolean, totalCount?: number }
  const res = await fetch(`/api/items?q=${encodeURIComponent(search)}&page=${page}`);
  const json = await res.json();
  return { data: json.items, hasMore: json.hasMore, totalCount: json.totalCount };
};

export default function Example() {
  const [value, setValue] = React.useState<Item | null>(null);

  return (
    <AsyncSelectPaginate<Item>
      value={value}
      onChange={setValue}
      loadOptions={loadOptions}
      getOptionLabel={(i) => i.name}
      getOptionValue={(i) => String(i.id)}
      placeholder="Search..."
    />
  );
}
```

---

## Important props (summary)

| Prop | Type | Default | Description |
|---|---:|---:|---|
| value | T \| null | — | Selected item. |
| onChange | (item: T \| null) => void | — | Called when selection changes. |
| loadOptions | (search: string, page: number) => Promise<{data: T[]; hasMore: boolean; totalCount?: number}> | — | Required async loader; must return `{ data, hasMore }`. |
| getOptionLabel | (item: T) => string | — | Returns label string for an item. |
| getOptionValue | (item: T) => string \| number | `String(item.id)` | Returns value for an item; default converts `id` to string. |
| renderOption | (item: T) => React.ReactNode | — | Custom renderer for an option. |
| label | string | `"Select"` | Field label text. |
| placeholder | string | `"Search..."` | Input placeholder. |
| debounceTimeout | number (ms) | `500` | Delay before calling `loadOptions`. |
| minSearchLength | number | `0` | Minimum input length before triggering `loadOptions`. |
| pageSize | number | `10` | Informational; server-side page size you expect. |
| isLoading | boolean | `false` | Override loading state. |
| error | string \| null | `null` | Override error message shown to user. |
| noOptionsMessage | string \| ({ inputValue: string }) => string | function | Message when no options found. |
| components | any | `{}` | Replace or extend internal react-select components. |
| isClearable, isSearchable, closeMenuOnSelect | boolean | `true` | Standard react-select behaviors. |
| className, classNamePrefix, styles | any | `''`, `'async-select'`, `{}` | Styling hooks and class prefixes. |
| cacheUniq | any | — | Used to invalidate internal cache when changed. |

Full props and types are exported from the package — see `src/types/index.ts` and the exported types from the package entry point.

---

## Behavior & expectations
- `loadOptions` must return an object with `data` (array) and `hasMore` (boolean). A malformed response logs a warning and the component shows an error message.
- If `minSearchLength` > 0, the component will not call `loadOptions` until the input reaches that length.
- Debounce delays calls by `debounceTimeout` ms to avoid frequent requests while typing.
- Pagination is handled internally; each successful load increments the internal `additional.page`.

---

## Why choose this library?
- TypeScript-first API for safer integration in typed projects.
- Minimal and focused: implements only what's needed for searchable, paginated selects.
- Predictable async contract `loadOptions(search, page)` simplifies backend integration and testing.
- Built-in debounce and min-search-length reduce server load by default.
- Easy to override option rendering and internal components.

---

## Testing & development
- Build artifacts:
  npm run build

- Run tests (Jest + React Testing Library):
  npm test

- Local publish simulation:
  npm pack
  npm i path/to/react-generic-async-select-<version>.tgz

---

## Publishing checklist
- Set `name`, `version`, `main`, `module`, and `types` in package.json.
- Include built output in `files` (e.g. `dist/`) or rely on `prepare` to build on install.
- Login to npm and run:
  npm publish

---

## Contributing
See CONTRIBUTING.md for development and PR guidelines.

---

## License
MIT (add LICENSE file)

...existing code...

# react-generic-select

A lightweight, TypeScript-first React select component with paginated async loading built on top of `react-select`. Focuses on simplicity, customization, and predictable async pagination behavior.

---

## Key features
- Paginated async loading via a simple `loadOptions(search, page)` function.
- Full TypeScript support and typed props.
- Built-in debounce to reduce excessive requests.
- Customizable option rendering (`renderOption`, `getOptionLabel`, `getOptionValue`).
- Configurable min search length before triggering requests.
- Handles loading and error states with optional overrides.
- Small surface area — focused on the core use-case (search + pagination).

---

## Quick install (local testing)
Install from a local folder (PowerShell):

```powershell
npm i file:c:/Users/Abdulkader/Desktop/react-generic-select
```

Or build and install a tarball:

```powershell
cd c:\Users\Abdulkader\Desktop\react-generic-select
npm run build
npm pack
# then in consumer project
npm i c:\Users\Abdulkader\Desktop\react-generic-select\react-generic-select-1.0.0.tgz
```

For active development:

```powershell
cd c:\Users\Abdulkader\Desktop\react-generic-select
npm run build
npm link
# in consumer project:
npm link react-generic-select
```

---

## Quick usage

```tsx
import React from 'react';
import AsyncSelectPaginate from 'react-generic-select';

type Item = { id: number; name: string };

const loadOptions = async (search: string, page: number) => {
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
| loadOptions | (search: string, page: number) => Promise<{data: T[]; hasMore: boolean; totalCount?: number}> | — | Required async loader. Must return `{ data, hasMore }`. |
| getOptionLabel | (item: T) => string | — | Returns label string for an item. |
| getOptionValue | (item: T) => string \| number | `String(item.id)` | Returns value for an item. |
| renderOption | (item: T) => React.ReactNode | — | Custom renderer for an option. |
| label | string | `"Select"` | Field label text. |
| placeholder | string | `"Search..."` | Input placeholder. |
| debounceTimeout | number (ms) | `500` | Delay before calling `loadOptions`. |
| minSearchLength | number | `0` | Minimum input length before triggering `loadOptions`. |
| pageSize | number | `10` | Informational page size for server requests. |
| isLoading | boolean | `false` | Override loading state. |
| error | string \| null | `null` | Override error message shown to user. |
| noOptionsMessage | string \| ({ inputValue: string }) => string | function | Message when no options found. |
| components | any | `{}` | Replace or extend internal react-select components. |
| isClearable, isSearchable, closeMenuOnSelect | boolean | `true` | Standard react-select behaviors. |
| className, classNamePrefix, styles | any | `''`, `'async-select'`, `{}` | Styling hooks and class prefixes. |
| cacheUniq | any | — | Used to invalidate internal cache when changed. |

Refer to `src/components/AsyncSelectPaginate.tsx` for full props and types.

---

## Behavior & expectations
- `loadOptions` must return an object containing `data` (array) and `hasMore` (boolean). A malformed response logs a warning and shows an error message.
- If `minSearchLength` > 0, the component will not call `loadOptions` until the input reaches that length.
- Debounce delays calls by `debounceTimeout` ms to avoid frequent requests while typing.
- Pagination is handled internally by `additional.page` — each successful load increments the page.

---

## Why choose this library?
- TypeScript-first API for safer integration in typed projects.
- Minimal and focused: implements only what's needed for searchable, paginated selects.
- Predictable async contract `loadOptions(search, page)` simplifies backend integration and testing.
- Built-in debounce and min-search-length reduce server load by default.
- Easy to override option rendering and internal components.

---

## Testing & development
- Build TypeScript artifacts:
  npm run build

- Run tests (Jest + React Testing Library):
  npm test

- Local publish simulation:
  npm pack
  npm i path/to/react-generic-select-<version>.tgz

---

## Publishing checklist
- Set `name`, `version`, `main`, `module`, and `types` in `package.json`.
- Include built output in `files` (e.g. `dist/`) or rely on `prepare` to build on install.
- Login to npm and run:
  npm publish

---

## Contributing
PRs and issues welcome. Include reproductions and tests for new behavior.

---

## License
Choose a license (e.g. MIT) and add a LICENSE file.

...existing code...
```// filepath: c:\Users\Abdulkader\Desktop\react-generic-select\README.md
...existing code...

# react-generic-select

A lightweight, TypeScript-first React select component with paginated async loading built on top of `react-select`. Focuses on simplicity, customization, and predictable async pagination behavior.

---

## Key features
- Paginated async loading via a simple `loadOptions(search, page)` function.
- Full TypeScript support and typed props.
- Built-in debounce to reduce excessive requests.
- Customizable option rendering (`renderOption`, `getOptionLabel`, `getOptionValue`).
- Configurable min search length before triggering requests.
- Handles loading and error states with optional overrides.
- Small surface area — focused on the core use-case (search + pagination).

---

## Quick install (local testing)
Install from a local folder (PowerShell):

```powershell
npm i file:c:/Users/Abdulkader/Desktop/react-generic-select
```

Or build and install a tarball:

```powershell
cd c:\Users\Abdulkader\Desktop\react-generic-select
npm run build
npm pack
# then in consumer project
npm i c:\Users\Abdulkader\Desktop\react-generic-select\react-generic-select-1.0.0.tgz
```

For active development:

```powershell
cd c:\Users\Abdulkader\Desktop\react-generic-select
npm run build
npm link
# in consumer project:
npm link react-generic-select
```

---

## Quick usage

```tsx
import React from 'react';
import AsyncSelectPaginate from 'react-generic-select';

type Item = { id: number; name: string };

const loadOptions = async (search: string, page: number) => {
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
| loadOptions | (search: string, page: number) => Promise<{data: T[]; hasMore: boolean; totalCount?: number}> | — | Required async loader. Must return `{ data, hasMore }`. |
| getOptionLabel | (item: T) => string | — | Returns label string for an item. |
| getOptionValue | (item: T) => string \| number | `String(item.id)` | Returns value for an item. |
| renderOption | (item: T) => React.ReactNode | — | Custom renderer for an option. |
| label | string | `"Select"` | Field label text. |
| placeholder | string | `"Search..."` | Input placeholder. |
| debounceTimeout | number (ms) | `500` | Delay before calling `loadOptions`. |
| minSearchLength | number | `0` | Minimum input length before triggering `loadOptions`. |
| pageSize | number | `10` | Informational page size for server requests. |
| isLoading | boolean | `false` | Override loading state. |
| error | string \| null | `null` | Override error message shown to user. |
| noOptionsMessage | string \| ({ inputValue: string }) => string | function | Message when no options found. |
| components | any | `{}` | Replace or extend internal react-select components. |
| isClearable, isSearchable, closeMenuOnSelect | boolean | `true` | Standard react-select behaviors. |
| className, classNamePrefix, styles | any | `''`, `'async-select'`, `{}` | Styling hooks and class prefixes. |
| cacheUniq | any | — | Used to invalidate internal cache when changed. |

Refer to `src/components/AsyncSelectPaginate.tsx` for full props and types.

---

## Behavior & expectations
- `loadOptions` must return an object containing `data` (array) and `hasMore` (boolean). A malformed response logs a warning and shows an error message.
- If `minSearchLength` > 0, the component will not call `loadOptions` until the input reaches that length.
- Debounce delays calls by `debounceTimeout` ms to avoid frequent requests while typing.
- Pagination is handled internally by `additional.page` — each successful load increments the page.

---

## Why choose this library?
- TypeScript-first API for safer integration in typed projects.
- Minimal and focused: implements only what's needed for searchable, paginated selects.
- Predictable async contract `loadOptions(search, page)` simplifies backend integration and testing.
- Built-in debounce and min-search-length reduce server load by default.
- Easy to override option rendering and internal components.

---

## Testing & development
- Build TypeScript artifacts:
  npm run build

- Run tests (Jest + React Testing Library):
  npm test

- Local publish simulation:
  npm pack
  npm i path/to/react-generic-select-<version>.tgz

---

## Publishing checklist
- Set `name`, `version`, `main`, `module`, and `types` in `package.json`.
- Include built output in `files` (e.g. `dist/`) or rely on `prepare` to build on install.
- Login to npm and run:
  npm publish

---

## Contributing
PRs and issues welcome. Include reproductions and tests for new behavior.

---

## License
Choose a license (e.g. MIT) and add a LICENSE file.

...existing code...
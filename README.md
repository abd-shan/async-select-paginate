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
To try the package locally from the project folder (Windows PowerShell):

- Install directly from local folder:
  npm i file:c:/Users/Abdulkader/Desktop/react-generic-select

- Or create a tarball and install it:
  cd c:\Users\Abdulkader\Desktop\react-generic-select
  npm run build
  npm pack
  # Then in a consumer project:
  npm i c:\Users\Abdulkader\Desktop\react-generic-select\react-generic-select-1.0.0.tgz

- For active development linking:
  cd c:\Users\Abdulkader\Desktop\react-generic-select
  npm run build
  npm link
  # In consumer project:
  npm link react-generic-select

Tip: add a `prepare` script to `package.json` so installs from git build automatically:
```json
"scripts": {
  "build": "tsc -p tsconfig.json",
  "prepare": "npm run build"
}
```

---

## Quick usage

```tsx
import React from 'react';
import AsyncSelectPaginate from 'react-generic-select';

type Item = { id: number; name: string };

const loadOptions = async (search: string, page: number) => {
  // return: { data: T[], hasMore: boolean, totalCount?: number }
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
- value: T | null  
- onChange: (item: T | null) => void  
- loadOptions: (search: string, page: number) => Promise<{ data: T[]; hasMore: boolean; totalCount?: number }>  
- getOptionLabel: (item: T) => string  
- getOptionValue?: (item: T) => string | number (defaults to stringified `id`)  
- renderOption?: (item: T) => React.ReactNode  
- placeholder?: string  
- label?: string  
- debounceTimeout?: number (ms, default 500)  
- minSearchLength?: number (default 0)  
- pageSize?: number (informational / for server-side)  
- isLoading?: boolean (can override internal loading)  
- error?: string | null (override error message)  
- noOptionsMessage?: string | ({ inputValue: string }) => string

Refer to the component props types in `src/components/AsyncSelectPaginate.tsx` for the full list.

---

## Behavior & expectations
- `loadOptions` must return an object containing `data` (array) and `hasMore` (boolean). Missing or malformed response will log a warning and show an error message.
- If `minSearchLength` > 0, the component will not call `loadOptions` until the input reaches that length.
- Debounce delays calls by `debounceTimeout` ms to avoid frequent requests while typing.
- Pagination is controlled via an `additional.page` value internally; each successful load increments the page.

---

## Why choose this library?
- TypeScript-first API for safer integration in typed projects.
- Minimal and focused: implements only what is needed for searchable, paginated selects — easier to understand and customize.
- Predictable async contract: single `loadOptions(search, page)` signature simplifies backend integration and testing.
- Built-in debounce + min-search-length to reduce server load by default.
- Easy to override rendering and behavior (option label/value/render, loading/error messages, components).

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
- Add `files` and include the built `dist/` or compiled output.
- Ensure `prepare` builds before clients install from git.
- Login to npm and run:
  npm publish

---

## Contributing
PRs and issues welcome. Include reproductions and tests for new behavior.

---

## License
Choose a license (e.g. MIT) and add a LICENSE file.
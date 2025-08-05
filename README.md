# Async Select Paginate

A highly customizable async paginated select component for React with infinite scroll support.

## Features

- 🔄 Infinite scroll pagination
- 🔍 Async search with debounce
- 🎨 Customizable themes (light/dark)
- 💅 Fully customizable styles
- 🛠 TypeScript support
- 🧪 Comprehensive test coverage
- 📖 Storybook documentation

## Installation

```bash
npm install async-select-paginate
# or
yarn add async-select-paginate
```

## Usage

```jsx
import React, { useState } from 'react';
import AsyncSelectPaginate from 'async-select-paginate';
import 'async-select-paginate/dist/styles.css';

function App() {
  const [selected, setSelected] = useState(null);

  const loadOptions = async (search, page) => {
    const response = await fetch(`/api/items?q=${search}&page=${page}`);
    const data = await response.json();
    return {
      data: data.items,
      hasMore: data.hasMore
    };
  };

  return (
    <AsyncSelectPaginate
      value={selected}
      onChange={setSelected}
      loadOptions={loadOptions}
      getOptionLabel={(item) => item.name}
      theme="dark"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `T \| null` | - | Current selected value |
| onChange | `(item: T \| null) => void` | - | Change handler |
| loadOptions | `(search: string, page: number) => Promise<{ data: T[], hasMore: boolean }>` | - | Async data loader |
| getOptionLabel | `(item: T) => string` | - | Function to get display label |
| theme | `'light' \| 'dark'` | `'light'` | Color theme |

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run storybook: `npm run storybook`
4. Run tests: `npm test`

## License

MIT
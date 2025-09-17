# Async Select Paginate

A powerful and customizable React component for async select with pagination, infinite scroll, and beautiful animations.

## Features

- 🔄 **Async Loading**: Load options asynchronously with pagination
- ♾️ **Infinite Scroll**: Automatically load more options as user scrolls
- 🎨 **Customizable**: Highly customizable with themes and custom option rendering
- 📱 **Responsive**: Works perfectly on all device sizes
- 🎭 **Animations**: Smooth animations and transitions
- 🔍 **Search**: Built-in search functionality
- 📦 **TypeScript**: Full TypeScript support
- 🧪 **Tested**: Comprehensive test coverage

## Installation

```bash
npm install async-select-paginate
```

## Usage

```tsx
import AsyncSelectPaginate from 'async-select-paginate';
import 'async-select-paginate/dist/style.css';

const MyComponent = () => {
  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const response = await fetch(`/api/options?search=${searchQuery}&page=${page}`);
    const data = await response.json();
    
    return {
      options: data.options,
      hasMore: data.hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <AsyncSelectPaginate
      loadOptions={loadOptions}
      onChange={(selectedOption) => console.log(selectedOption)}
      placeholder="Select an option..."
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadOptions` | `(searchQuery, loadedOptions, additional) => Promise<{options, hasMore, additional}>` | - | Function to load options asynchronously |
| `onChange` | `(selectedOption) => void` | - | Callback when selection changes |
| `placeholder` | `string` | 'Select...' | Placeholder text |
| `isSearchable` | `boolean` | `true` | Enable search functionality |
| `isClearable` | `boolean` | `true` | Show clear button |
| `isDisabled` | `boolean` | `false` | Disable the select |
| `isLoading` | `boolean` | `false` | Show loading state |
| `value` | `OptionType` | - | Selected value |
| `defaultValue` | `OptionType` | - | Default selected value |
| `className` | `string` | - | Additional CSS class |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `customOptionRenderer` | `(option) => ReactNode` | - | Custom option renderer |
| `customValueRenderer` | `(option) => ReactNode` | - | Custom value renderer |

## Styling

The component comes with built-in styles that you can import:

```tsx
import 'async-select-paginate/dist/style.css';
```

You can also customize the appearance by overriding CSS variables or using custom classes.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the library
npm run build

# Run Storybook
npm run storybook
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
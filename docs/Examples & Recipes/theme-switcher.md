---
id: theme-switcher
title: Theme Switcher
sidebar_label: Theme Switcher
sidebar_position: 3
---

# Theme Switcher

Demonstrates a global refraction and an optic for reusable theming.

## What You'll Learn
- Global state with `useRefraction`
- Creating an optic (reusable logic)
- Using class toggles for theming

## Example
```jsx
import { createComponent, useRefraction, useOptic } from 'refract';

// global theme refraction
export const theme = useRefraction('light');

export function useTheme() {
  useOptic(() => {
    document.documentElement.dataset.theme = theme.value;
    return () => { /* cleanup if needed */ };
  }, [theme.value]);
  return theme;
}

const ThemeSwitcher = createComponent(() => {
  const t = useTheme();
  const toggle = () => t.set(t.value === 'light' ? 'dark' : 'light');
  return (
    <button onClick={toggle}>
      Theme: {t.value} (toggle)
    </button>
  );
});

export default ThemeSwitcher;
```

## Tips
- Keep global state minimal and well-named.
- Encapsulate DOM side-effects inside optics.


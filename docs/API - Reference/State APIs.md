---
sidebar_position: 2
---

# State APIs

### `useRefraction(initialValue)`
- **Description:** Creates a reactive state unit called a *refraction*.
- **Usage:**
```js
import { useRefraction } from 'refract';

const theme = useRefraction('light');
theme.set('dark');
console.log(theme.value); // 'dark'
```
- **Features:**
  - Reactive updates (auto re-render)
  - Supports primitive & complex data
  - Local or global scope

### `lens.useRefraction(initialValue)`
- Scoped to a component via its lens.
- Ensures local state isolation.

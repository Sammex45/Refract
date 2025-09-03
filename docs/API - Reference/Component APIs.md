---
sidebar_position: 1
---

# Component APIs

### `createComponent()`
- **Description:** Defines a UI component as a pure function returning JSX-like syntax.
- **Usage:**
```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicked {count.value} times
    </button>
  );
});
```
- **Props Handling:** Props are passed through `lens`, providing scoped access to state and effects.
- **Key Features:**
  - Functional, declarative components
  - Lens-driven props and state
  - Integrated with refractions

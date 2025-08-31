---
sidebar_position: 1
---


# Counter App

A minimal example demonstrating components, lenses, and refractions.

## What You'll Learn
- Creating a component with `createComponent`
- Using a local refraction for state
- Handling events

## Example
```jsx
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicked {count.value} times
    </button>
  );
});

export default Counter;
```

## Tips
- Prefer pure component functions.
- Keep state local unless it must be shared globally.


---
sidebar_position: 3
---

# Effects - APIs

### `lens.useEffect(callback, deps)`
- **Description:** Runs side effects tied to component lifecycle.
- **Usage:**
```js
const TodoList = createComponent(({ lens }) => {
  const todos = lens.useRefraction([]);

  lens.useEffect(() => {
    fetchTodos().then(todos.set);
  }, []);
});
```
- **Features:**
  - Dependency-aware
  - Scoped cleanup
  - Similar to React’s `useEffect`

### `useOptic(callback, deps)`
- **Description:** Declarative way to manage reusable side-effect logic.
- **Usage:**
```js
import { useOptic, useRefraction } from 'refract';

function useMousePosition() {
  const pos = useRefraction({ x: 0, y: 0 });

  useOptic(() => {
    const handler = e => pos.set({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
```
- **Features:**
  - Dependency-aware caching
  - Reusable logic patterns
  - Animation-ready transitions

### `useFlash(callback)`
- **Description:** Runs once after render, useful for animations or DOM measurements.
- **Usage:**
```js
lens.useFlash(() => {
  console.log('Component rendered!');
});
```

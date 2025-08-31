---
id: mouse-tracker
title: Mouse Tracker
sidebar_label: Mouse Tracker
sidebar_position: 5
---

# Mouse Tracker

Tracks mouse position across the viewport using an optic.

## What You'll Learn
- Creating a custom optic
- Updating refractions from DOM events
- Leveraging dependency-aware cleanup

## Example
```jsx
import { createComponent, useRefraction, useOptic } from 'refract';

function useMousePosition() {
  const pos = useRefraction({ x: 0, y: 0 });
  useOptic(() => {
    const handler = (e) => pos.set({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

const MouseTracker = createComponent(() => {
  const pos = useMousePosition();
  return <div>Mouse: {pos.value.x}, {pos.value.y}</div>;
});

export default MouseTracker;
```

## Tips
- Keep optics focused and cleanup on unmount.
- Return only the reactive data needed by consumers.


---
id: optics-internals
title: Optics Internals
sidebar_label: Optics Internals
sidebar_position: 3
---

# Optics Internals

Optics provide modular, reusable UI logic similar to hooks.  
Internally, they handle caching, dependency-tracking, and animation awareness.

## Highlights
- Dependency-aware re-computation
- Scoped lifecycle management
- Reusable across components

## Example
```js
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


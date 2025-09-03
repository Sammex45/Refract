---
sidebar_position: 1
---



# Compiler Optimization

Refract ships with a lightweight compiler that optimizes reactive updates.  
It reduces unnecessary renders, performs tree-shaking, and ensures minimal bundle size.

## Why It Matters
- Eliminates dead code
- Optimizes refractions
- Enables efficient code-splitting

## Features
- Static analysis of components
- Lazy loading
- Performance-aware bundling

## Example
```js
// Compiler transforms this automatically:
const count = useRefraction(0);
// optimized for minimal re-renders
```


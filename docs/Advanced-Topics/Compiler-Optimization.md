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

## How the Compiler Works

The compiler analyzes your component code at build time to:

- Remove unused variables and functions
- Automatically memoize computations where possible
- Inline simple expressions
- Split code for lazy loading based on usage
- Optimize updates to only re-render affected parts of the UI

## Example

```js
// Compiler transforms this automatically:
const count = useRefraction(0);
// optimized for minimal re-renders
```

## Customization

You can configure the compiler through your build tool or CLI options to enable or disable specific optimizations as needed.

## Summary

Compiler optimization in Refract ensures your applications are fast, efficient, and as small as possible, without manual tuning.

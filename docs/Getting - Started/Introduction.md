---
sidebar_position: 1
---

# Introduction

Welcome to Refract, the modern reactive UI framework for building fast, scalable, and delightful web applications.

## What is Refract?

Refract is a new paradigm for building user interfaces, inspired by optics and functional programming. It enables you to:

- Build complex UIs from simple, composable components
- Manage state and side effects with ease
- Achieve high performance and scalability
- Write less code with more power

## Why Choose Refract?

- **Declarative**: Describe what you want, not how to do it
- **Reactive**: Automatic updates when your data changes
- **Composable**: Build UIs from small, reusable pieces
- **Type-safe**: First-class TypeScript support
- **Performant**: Fine-grained reactivity for blazing-fast updates

## Key Features

- Component model with optics (lenses, refractions)
- State management without boilerplate
- Built-in effects and side effect isolation
- Powerful composition patterns
- First-class TypeScript and type inference
- Interop with React and other libraries

## Example

```jsx
import { createComponent } from "refract-js";

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  return (
    <div>
      <button onClick={() => count.set(count.value - 1)}>-</button>
      <span>{count.value}</span>
      <button onClick={() => count.set(count.value + 1)}>+</button>
    </div>
  );
});
```

## Next Steps

- [Quick Start](/docs/quickstart)
- [Core Concepts](/docs/concepts)
- [API Reference](/api)
- [Examples](/examples)
- [Community Discord](https://discord.gg/refract)

---

_Ready to build your first Refract app? Head to the Quick Start guide!_

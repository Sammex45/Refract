---
sidebar_position: 2
---

# Refractions

Refractions are the core reactive state primitive in Refract. They allow you to manage state in a way that is simple, predictable, and automatically updates your UI when values change.

## What is a Refraction?

A refraction is a reactive value. When you update a refraction, any part of your UI that uses it will automatically update. Refractions can hold any type of value: numbers, strings, objects, arrays, or even more complex data structures.

## Creating a Refraction

Use `lens.useRefraction` to create local state inside a component:

```jsx
const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  return (
    <button onClick={() => count.set(count.value + 1)}>
      Count: {count.value}
    </button>
  );
});
```

## Reading and Updating Refractions

- Access the current value with `.value`
- Update the value with `.set(newValue)`

```jsx
const NameInput = createComponent(({ lens }) => {
  const name = lens.useRefraction("");

  return (
    <input
      value={name.value}
      onChange={(e) => name.set(e.target.value)}
      placeholder="Enter your name"
    />
  );
});
```

## Global Refractions

For state that should be shared across components, use `globalRefraction`:

```jsx
import { globalRefraction } from "refract-js";

export const currentUser = globalRefraction(null);
```

You can use global refractions in any component just like local ones.

## Derived Refractions

Create values that depend on other refractions using `lens.useComputed` or `derivedRefraction`:

```jsx
const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  const double = lens.useComputed(() => count.value * 2);

  return (
    <div>
      <p>Count: {count.value}</p>
      <p>Double: {double.value}</p>
    </div>
  );
});
```

## Why Use Refractions?

- Simple API for state management
- Automatic UI updates
- Works with any data type
- Supports both local and global state
- Enables advanced patterns like derived state and effects

## Summary

Refractions are the foundation of state management in Refract. They make it easy to build reactive, maintainable applications without unnecessary complexity.

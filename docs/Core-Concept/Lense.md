---
sidebar_position: 3
---

# Lenses

Lenses are a core concept in Refract, providing a unified interface for managing state, props, effects, and more within your components. They enable you to interact with all aspects of a component's data and lifecycle in a consistent and predictable way.

## What is a Lens?

A lens is an object passed to every Refract component. It gives you access to:

- **Props**: The properties passed to your component.
- **State**: Local reactive state via `lens.useRefraction`.
- **Effects**: Side effects via `lens.useEffect`.
- **Computed Values**: Derived state via `lens.useComputed`.
- **Custom Hooks**: Encapsulated logic via `lens.useOptic`.
- **Streams**: Reactive streams for advanced scenarios.

## Basic Usage

```jsx
import { createComponent } from "refract-js";

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  lens.useEffect(() => {
    document.title = `Count: ${count.value}`;
  }, [count.value]);

  return (
    <div>
      <h1>Count: {count.value}</h1>
      <button onClick={() => count.set(count.value + 1)}>Increment</button>
    </div>
  );
});
```

## Accessing Props

Props are available directly on the lens:

```jsx
const Greeting = createComponent(({ lens }) => {
  return <h2>Hello, {lens.props.name}!</h2>;
});
```

## Creating Local State

Use `lens.useRefraction` to create local reactive state:

```jsx
const Toggle = createComponent(({ lens }) => {
  const isOpen = lens.useRefraction(false);
  return (
    <button onClick={() => isOpen.set(!isOpen.value)}>
      {isOpen.value ? "Open" : "Closed"}
    </button>
  );
});
```

## Using Effects

Run side effects with `lens.useEffect`:

```jsx
const Timer = createComponent(({ lens }) => {
  const seconds = lens.useRefraction(0);

  lens.useEffect(() => {
    const id = setInterval(() => {
      seconds.set(seconds.value + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>Seconds: {seconds.value}</div>;
});
```

## Computed Values

Create derived state with `lens.useComputed`:

```jsx
const Price = createComponent(({ lens }) => {
  const amount = lens.useRefraction(10);
  const tax = lens.useRefraction(0.2);
  const total = lens.useComputed(() => amount.value * (1 + tax.value));

  return <div>Total: ${total.value.toFixed(2)}</div>;
});
```

## Custom Hooks with Optics

Encapsulate reusable logic with `lens.useOptic`:

```jsx
function useCounter(lens, initial = 0) {
  const count = lens.useRefraction(initial);
  const increment = () => count.set(count.value + 1);
  const decrement = () => count.set(count.value - 1);
  return { count, increment, decrement };
}

const Counter = createComponent(({ lens }) => {
  const { count, increment, decrement } = lens.useOptic(useCounter, 5);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count.value}</span>
      <button onClick={increment}>+</button>
    </div>
  );
});
```

## Summary

Lenses provide a single, consistent API for all component needs in Refract. By using the lens, you can manage state, props, effects, and more with clarity and simplicity.

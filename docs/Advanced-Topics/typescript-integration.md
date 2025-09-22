---
id: typescript-integration
title: TypeScript Integration
sidebar_label: TypeScript Integration

sidebar_position: 4
---

# TypeScript Integration

Refract provides **first-class TypeScript support** with strong typing for components, lenses, and refractions.

## Advantages

- Safer code with type inference
- Autocomplete for APIs
- Catch errors at compile time

## Typing Components

You can type your component props and lens usage for maximum safety:

```ts
import { createComponent } from "refract-js";

interface CounterProps {
  initial: number;
}

const Counter = createComponent<CounterProps>(({ lens }) => {
  const count = lens.useRefraction(lens.props.initial);
  return <div>Count: {count.value}</div>;
});
```

## Typing Refractions

Specify the type parameter for `useRefraction` or `globalRefraction`:

```ts
import { useRefraction, globalRefraction } from "refract-js";

const count = useRefraction<number>(0);
const user = globalRefraction<{ name: string; age: number } | null>(null);
```

## Typing Optics

When creating custom optics (hooks), use generics for flexibility:

```ts
function useCounter<TLens>(lens: TLens, initial: number = 0) {
  const count = lens.useRefraction<number>(initial);
  const increment = () => count.set(count.value + 1);
  return { count, increment };
}
```

## Example

```ts
import { useRefraction } from "refract";

const count = useRefraction<number>(0);
count.set(1);
```

## Summary

TypeScript integration in Refract helps you write robust, maintainable code with confidence, leveraging the full power of static typing.

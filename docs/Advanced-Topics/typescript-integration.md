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

## Example
```ts
import { useRefraction } from 'refract';

const count = useRefraction<number>(0);
count.set(1);
```


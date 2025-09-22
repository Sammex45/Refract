---
sidebar_position: 4
---

# Optical Composition

Optical composition in Refract refers to the practice of building reusable logic and state patterns using "optics"—custom hooks that encapsulate stateful or side-effectful behavior. This approach allows you to compose complex features from simple, focused units of logic.

## What is an Optic?

An optic is a function (custom hook) that uses the lens API to encapsulate reusable logic, state, or effects. Optics can be shared across components, making your codebase more modular and maintainable.

## Creating an Optic

Here's a simple example of an optic for a counter:

```jsx
function useCounter(lens, initial = 0) {
  const count = lens.useRefraction(initial);
  const increment = () => count.set(count.value + 1);
  const decrement = () => count.set(count.value - 1);
  return { count, increment, decrement };
}
```

## Using Optics in Components

Use `lens.useOptic` to use your custom optic inside a component:

```jsx
const Counter = createComponent(({ lens }) => {
  const { count, increment, decrement } = lens.useOptic(useCounter, 0);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count.value}</span>
      <button onClick={increment}>+</button>
    </div>
  );
});
```

## Composing Multiple Optics

You can combine multiple optics to build more complex features:

```jsx
function useForm(lens, initial = {}) {
  const values = lens.useRefraction(initial);
  const setField = (name, value) => {
    values.set({ ...values.value, [name]: value });
  };
  return { values, setField };
}

const SignupForm = createComponent(({ lens }) => {
  const { values, setField } = lens.useOptic(useForm, {
    email: "",
    password: "",
  });
  const { count, increment } = lens.useOptic(useCounter, 0);

  return (
    <form>
      <input
        value={values.value.email}
        onChange={(e) => setField("email", e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={values.value.password}
        onChange={(e) => setField("password", e.target.value)}
        placeholder="Password"
      />
      <button type="button" onClick={increment}>
        Submit ({count.value})
      </button>
    </form>
  );
});
```

## Sharing and Reusing Optics

Optics can be defined in separate files and imported wherever needed, promoting code reuse and separation of concerns.

## Summary

Optical composition enables you to build scalable, maintainable applications by composing logic and state using optics. This pattern encourages modularity and clarity in your codebase.

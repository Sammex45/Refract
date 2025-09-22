---
sidebar_position: 5
---

# Side Effects

Side effects are operations that interact with the outside world or cause changes outside the scope of your component's render logic. In Refract, you handle side effects using `lens.useEffect`, which is similar to React's `useEffect` but designed for fine-grained reactivity.

## What is a Side Effect?

A side effect is any operation that affects something outside the function, such as:

- Fetching data from an API
- Subscribing to events or timers
- Manipulating the DOM
- Logging
- Setting up or cleaning up resources

## Using `lens.useEffect`

You can run side effects in your component by calling `lens.useEffect`. The effect runs after the component renders and can depend on specific values.

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

## Effect Dependencies

The second argument to `lens.useEffect` is a dependency array. The effect will re-run whenever any dependency changes.

```jsx
const Greeting = createComponent(({ lens }) => {
  const name = lens.useRefraction("World");

  lens.useEffect(() => {
    document.title = `Hello, ${name.value}!`;
  }, [name.value]);

  return (
    <input
      value={name.value}
      onChange={(e) => name.set(e.target.value)}
      placeholder="Enter your name"
    />
  );
});
```

## Cleanup Functions

Return a function from your effect to clean up resources when the component unmounts or before the effect re-runs.

```jsx
const Subscription = createComponent(({ lens }) => {
  const data = lens.useRefraction(null);

  lens.useEffect(() => {
    const unsubscribe = subscribeToData((newData) => {
      data.set(newData);
    });
    return () => unsubscribe();
  }, []);

  return <div>Data: {JSON.stringify(data.value)}</div>;
});
```

## Best Practices

- Only use effects for operations that can't be handled by pure rendering.
- Always specify dependencies to avoid unnecessary runs.
- Clean up subscriptions, timers, or listeners to prevent memory leaks.

## Summary

Side effects in Refract are managed with `lens.useEffect`, allowing you to perform asynchronous operations, subscriptions, and other external interactions in a predictable and maintainable way.

---
sidebar_position: 2
id: stream-based-updates
title: Stream-based Updates
sidebar_label: Stream-based Updates
---

# Stream-based Updates

Refract introduces **native support for stream-based UI updates**.  
This allows efficient handling of real-time data and event-driven systems.

## Use Cases

- WebSockets and live data feeds
- Reactive forms
- Continuous sensor or event inputs

## Benefits

- Granular updates
- No manual reconciliation
- Reactive pipelines

## How Streams Work

Streams in Refract are reactive data sources that emit values over time. You can subscribe to a stream and update your UI or state whenever new data arrives.

## Example

```js
const price = useRefraction(0);

stream.subscribe((newValue) => {
  price.set(newValue);
});
```

## Integrating Streams in Components

You can use streams with Refract components to handle real-time updates:

```jsx
const PriceTicker = createComponent(({ lens }) => {
  const price = lens.useRefraction(0);

  lens.useEffect(() => {
    const unsubscribe = priceStream.subscribe((newValue) => {
      price.set(newValue);
    });
    return () => unsubscribe();
  }, []);

  return <div>Current Price: {price.value}</div>;
});
```

## Summary

Stream-based updates in Refract make it easy to build responsive, real-time applications with minimal boilerplate and maximum efficiency.

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

## Example
```js
const price = useRefraction(0);

stream.subscribe(newValue => {
  price.set(newValue);
});
```


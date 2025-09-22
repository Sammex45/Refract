---
id: interop
title: Interop
sidebar_label: Interop
sidebar_position: 5
---

# Interop

Refract is designed to integrate smoothly with existing ecosystems.

## Interop Scenarios

- Embedding in React or Vue projects
- Using third-party libraries (D3, Three.js, etc.)
- Interfacing with REST/GraphQL APIs

## Embedding Refract in Other Frameworks

You can render Refract components inside React, Vue, or other frameworks by mounting them to a DOM node managed by the host framework.

**Example: Embedding in React**

```jsx
import { createRoot } from "refract-js";
import { MyRefractComponent } from "./MyRefractComponent";

function ReactWrapper() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const root = createRoot(ref.current);
      root.render(<MyRefractComponent />);
      return () => root.unmount();
    }
  }, []);

  return <div ref={ref} />;
}
```

## Using Third-Party Libraries

Refract works well with libraries like D3, Chart.js, or Three.js. Use `lens.useEffect` to integrate with imperative APIs.

```jsx
const Chart = createComponent(({ lens }) => {
  const ref = useRef(null);
  const data = lens.props.data;

  lens.useEffect(() => {
    if (ref.current) {
      // Initialize or update chart with D3/Chart.js/etc.
      drawChart(ref.current, data);
    }
  }, [data]);

  return <canvas ref={ref} />;
});
```

## Interfacing with APIs

Use fetch, GraphQL, or any data library inside effects or optics.

```jsx
const UserFetcher = createComponent(({ lens }) => {
  const user = lens.useRefraction(null);

  lens.useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(user.set);
  }, []);

  return user.value ? <div>{user.value.name}</div> : <div>Loading...</div>;
});
```

## Goal

Provide flexibility without lock-in. Refract is designed to work alongside your existing tools and libraries, making it easy to adopt incrementally.

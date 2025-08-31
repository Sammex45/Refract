---
id: glossary
title: Glossary
sidebar_label: Glossary
sidebar_position: 2
---

# Glossary

A comprehensive list of terms and concepts used throughout the Refract framework and documentation.

## A

### Animation API
Refract's built-in system for declaring animations directly in component definitions. Supports spring physics, keyframes, and gesture-based animations without external libraries.

### Async Streams
A pattern in Refract for handling asynchronous data flows using stream-based updates. Enables reactive UI updates based on async events like API calls or user interactions.

### Auto-memoization
Refract's compiler feature that automatically optimizes components by memoizing expensive computations without explicit developer intervention.

## B

### Batched Updates
A performance optimization where multiple state changes are grouped and applied in a single render cycle, reducing unnecessary re-renders.

### Bridge Pattern
The architectural pattern used by lenses to connect props, state, and lifecycle methods in a unified interface.

## C

### Compiler
Refract's build-time tool that analyzes and optimizes your code, performing transformations for better runtime performance and smaller bundle sizes.

### Component
The fundamental building block of Refract applications. Components are pure functions that return JSX and receive a lens as their primary interface.

```javascript
const MyComponent = createComponent(({ lens }) => {
  return <div>Hello World</div>;
});
```

### Composition
The pattern of building complex UIs by combining simpler components. Refract emphasizes composition over inheritance.

### Computed Refraction
A derived state value that automatically updates when its dependencies change, similar to computed properties in other frameworks.

### createApp
The main function used to initialize a Refract application and mount it to the DOM.

```javascript
createApp(App).mount('#root');
```

### createComponent
The primary function for defining Refract components. Takes a pure function that receives a lens object.

## D

### Declarative
A programming paradigm where you describe what the UI should look like rather than how to achieve it. Refract uses declarative syntax for components, animations, and state management.

### Dependency Caching
Optical composition's feature that intelligently caches results based on dependencies, preventing unnecessary recalculations.

### Derived State
State values computed from other state values, automatically updating when dependencies change.

### DevTools
Browser extension and development tools for debugging Refract applications, inspecting component trees, and monitoring state changes.

## E

### Effect
Side effects in Refract are controlled operations that interact with external systems (APIs, DOM, timers). Managed through `useEffect`, `useOptic`, and `useFlash`.

### Event Delegation
Refract's optimization technique where event listeners are attached to parent elements rather than individual child elements.

## F

### Fiber Architecture
Refract's internal reconciliation algorithm inspired by React Fiber, enabling incremental rendering and better performance for complex UIs.

### Fragment
A wrapper component that allows returning multiple elements without adding extra DOM nodes.

```javascript
<Fragment>
  <Child1 />
  <Child2 />
</Fragment>
```

### Functional Component
Components defined as pure functions rather than classes, the standard way of creating components in Refract.

## G

### Global Refraction
A refraction that exists outside component scope and can be accessed from anywhere in the application, useful for app-wide state like themes or user data.

```javascript
const theme = globalRefraction('light');
```

## H

### Hydration
The process of attaching event listeners and state to server-rendered HTML, making it interactive on the client side.

### Higher-Order Component (HOC)
A pattern for reusing component logic by wrapping components with additional functionality.

### Hot Module Replacement (HMR)
Development feature that updates modules in the browser without full page reload, preserving application state.

## I

### Incremental Rendering
Refract's ability to break rendering work into chunks, preventing UI blocking for complex updates.

### Interpolation
The process of embedding JavaScript expressions within JSX using curly braces `{}`.

## J

### JSX
JavaScript XML syntax extension used in Refract for describing UI structure. Transpiled to function calls at build time.

```javascript
const element = <div className="container">Hello</div>;
```

## K

### Keyed Updates
Optimization for list rendering where each item has a unique key, enabling efficient updates when list items change.

## L

### Lazy Loading
Technique for loading components or resources only when needed, reducing initial bundle size.

### Lens
The primary interface provided to Refract components, offering unified access to props, state, and lifecycle methods.

```javascript
createComponent(({ lens }) => {
  const state = lens.useRefraction(0);
  const props = lens.props;
});
```

### Lifecycle
The stages a component goes through from creation to destruction. Refract provides hooks for mounting, updating, and unmounting.

### Local Refraction
A refraction scoped to a specific component instance, isolated from other components.

## M

### Memoization
Caching technique to avoid recalculating expensive operations when inputs haven't changed.

### Mount
The process of attaching a Refract component tree to a DOM element.

### Mutation
Direct modification of refraction values using the `.set()` method, triggering reactive updates.

## N

### Native Events
Browser DOM events that Refract components can listen to using standard event handlers.

## O

### Observable Pattern
The reactive programming pattern underlying refractions, where changes to state automatically notify and update subscribers.

### Optic
A reusable unit of UI logic in Refract, similar to React hooks but with enhanced caching and animation capabilities.

```javascript
function useCounter() {
  const count = useRefraction(0);
  return { count, increment: () => count.set(count.value + 1) };
}
```

### Optical Composition
Refract's system for composing and reusing UI logic through optics, providing modular patterns for common functionality.

### Optimization
Various techniques Refract uses to improve performance, including compile-time optimizations, auto-memoization, and virtual DOM diffing.

## P

### Portal
A way to render children into a DOM node that exists outside the parent component's DOM hierarchy.

### Props
Properties passed from parent to child components, accessed through the lens interface.

### Pure Function
A function that always returns the same output for the same input and has no side effects. Refract components are pure functions.

## Q

### Query
In Refract context, often refers to data fetching patterns or searching through component trees in DevTools.

## R

### Reactive
Programming paradigm where the UI automatically updates in response to state changes. Core to Refract's architecture.

### Reconciliation
The process of comparing virtual DOM trees and determining minimal DOM updates needed.

### Refract
The framework itself, named after the optical phenomenon of light bending, symbolizing how data flows through the application.

### Refraction
Refract's core reactive state unit. A container for values that triggers UI updates when changed.

```javascript
const count = useRefraction(0);
count.set(5); // Triggers update
```

### Render
The process of creating virtual DOM from components and updating the actual DOM.

### Return Value
What a component function returns, typically JSX describing the UI structure.

## S

### Scheduler
Refract's internal system for prioritizing and batching updates for optimal performance.

### Scope
The context in which variables and refractions exist, either local to a component or global to the application.

### Server-Side Rendering (SSR)
Rendering Refract components on the server to send HTML to the client, improving initial load performance and SEO.

### Side Effect
Operations that affect systems outside the component, like API calls, timers, or DOM manipulation.

### Signal
Alternative term sometimes used for refractions, referring to reactive state primitives.

### State
Data that changes over time in an application. In Refract, state is managed through refractions.

### Static Site Generation (SSG)
Pre-rendering Refract applications at build time to create static HTML files.

### Stream
Continuous flow of data updates that components can subscribe to for reactive updates.

### Subscription
The connection between a component and a refraction, enabling automatic updates when the refraction changes.

### Suspense
Pattern for handling async operations with loading states and error boundaries.

### Synthetic Event
Refract's cross-browser wrapper around native browser events for consistent behavior.

## T

### Template
The JSX structure returned by a component, defining its visual representation.

### Time-travel Debugging
DevTools feature allowing developers to step through state changes over time.

### Transition
Animation between different states of a component, managed by Refract's animation API.

### Tree Shaking
Build optimization that removes unused code from the final bundle.

### TypeScript
Typed superset of JavaScript fully supported by Refract with enhanced type inference.

## U

### Unmount
The process of removing a component from the DOM and cleaning up its resources.

### Update
When a component re-renders due to state or props changes.

### useEffect
Hook for managing side effects in components, runs after render.

```javascript
lens.useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

### useFlash
Special effect hook that runs once after initial render, optimized for animations.

### useOptic
Hook for using optical composition patterns within components.

### useRefraction
Hook for creating local reactive state within a component.

## V

### Virtual DOM
In-memory representation of the UI that Refract uses to efficiently calculate DOM updates.

### Virtual List
Component pattern for efficiently rendering large lists by only rendering visible items.

## W

### Watcher
Internal mechanism that monitors refraction changes and triggers updates.

### Web Components
Browser-native component standard that Refract can integrate with.

### Worker Thread
Background JavaScript thread that Refract can utilize for heavy computations.

## X

### XML-like Syntax
Refers to JSX, the XML-like syntax used for describing component structure.

## Y

### Yield
In async contexts, points where Refract can pause expensive operations to maintain UI responsiveness.

## Z

### Zone
Execution context in Refract that tracks dependencies and effects for proper cleanup and optimization.

---

## Additional Resources

- 📚 [Core Concepts Guide](/concepts/overview) - Deep dive into fundamental concepts
- 🔧 [API Reference](/api/core) - Complete API documentation
- 💡 [Examples](/examples/patterns) - See these terms in action
- ❓ [FAQ](/resources/faq) - Common questions answered

*This glossary is continuously updated as Refract evolves. Last updated: 2024*
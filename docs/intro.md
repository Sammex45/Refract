---
sidebar_position: 1
---


# Introduction

Welcome to **Refract** — a reactive, composable JavaScript framework that reimagines how we build user interfaces. Just as light refracts when passing through different mediums, Refract bends the traditional approaches to UI development, offering a clearer, more elegant path forward.

## 🌟 What is Refract?

Refract is a modern JavaScript framework designed for building reactive user interfaces with unprecedented clarity and performance. Born from the lessons learned across the JavaScript ecosystem, Refract combines the best ideas from React, Vue, Svelte, and Solid.js while introducing innovative concepts that push the boundaries of what's possible in web development.

```jsx
// This is Refract - Simple, reactive, and powerful
import { createComponent } from 'refract-js'

const Hello = createComponent(({ lens }) => {
  const name = lens.useRefraction('World')
  
  return (
    <div>
      <h1>Hello, {name.value}!</h1>
      <input 
        value={name.value}
        onChange={(e) => name.set(e.target.value)}
      />
    </div>
  )
})
```

## 💡 Why Refract?

### The Problem with Current Frameworks

Modern web development has come a long way, but developers still face common challenges:

- **Complexity Creep**: Simple apps become complex quickly
- **Performance Bottlenecks**: Virtual DOM overhead and unnecessary re-renders
- **State Management Confusion**: Multiple competing patterns and libraries
- **Bundle Size Bloat**: Frameworks getting larger with each release
- **Developer Experience Gaps**: Debugging reactive systems is still difficult

### The Refract Solution

Refract addresses these challenges through:

1. **🔮 True Reactivity**: Fine-grained reactivity without virtual DOM overhead
2. **📦 Tiny Bundle Size**: Core library is only ~15KB gzipped
3. **⚡ Compile-Time Optimization**: Smart compiler that optimizes your code
4. **🎯 Unified Mental Model**: One consistent way to handle state and effects
5. **🛠️ Superior DX**: Built-in DevTools, time-travel debugging, and clear error messages

## 🎯 Core Philosophy

Refract is built on four fundamental principles:

### 1. Clarity Through Simplicity
```jsx
// Everything you need is in the lens
const Component = createComponent(({ lens }) => {
  const state = lens.useRefraction(0)      // State
  const props = lens.props                 // Props
  lens.useEffect(() => {}, [])            // Effects
  
  return <div>{/* Your UI */}</div>
})
```

### 2. Reactivity Without Compromise
```jsx
// State changes automatically update the UI
const counter = lens.useRefraction(0)
counter.set(counter.value + 1) // UI updates instantly
```

### 3. Composition Over Configuration
```jsx
// Build complex UIs from simple, composable pieces
const useCounter = () => {
  const count = useRefraction(0)
  return {
    count,
    increment: () => count.set(count.value + 1),
    decrement: () => count.set(count.value - 1)
  }
}
```

### 4. Performance by Default
```jsx
// Automatic optimizations, no manual memoization needed
const ExpensiveComponent = createComponent(({ lens }) => {
  // Refract automatically optimizes this component
  return <ComplexVisualization data={lens.props.data} />
})
```

## ✨ Key Features

### 🔄 Refractions - Reactive State Primitives

Refractions are Refract's answer to state management - simple, predictable, and powerful:

```jsx
const App = createComponent(({ lens }) => {
  const todos = lens.useRefraction([])
  const filter = lens.useRefraction('all')
  
  // Derived state updates automatically
  const filtered = todos.value.filter(todo => {
    if (filter.value === 'active') return !todo.done
    if (filter.value === 'completed') return todo.done
    return true
  })
  
  return <TodoList items={filtered} />
})
```

### 🔍 Lenses - Unified Component Interface

Lenses provide a single, consistent interface for all component needs:

```jsx
const Component = createComponent(({ lens }) => {
  // Everything comes through the lens
  lens.props        // Access props
  lens.useRefraction // Create local state
  lens.useEffect    // Handle side effects
  lens.useComputed  // Derive values
  lens.useOptic     // Use custom hooks
})
```

### 🎨 Optical Composition - Reusable Logic Patterns

Create powerful, reusable patterns with optics:

```jsx
// Define once, use everywhere
function useFetch(url) {
  const data = useRefraction(null)
  const loading = useRefraction(true)
  const error = useRefraction(null)
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data.set)
      .catch(error.set)
      .finally(() => loading.set(false))
  }, [url])
  
  return { data, loading, error }
}

// Use in any component
const UserProfile = createComponent(({ lens }) => {
  const { data: user, loading } = useFetch('/api/user')
  
  if (loading.value) return <Spinner />
  return <Profile user={user.value} />
})
```

### 🚀 Stream-Based Updates

Refract uses streams for efficient, granular updates:

```jsx
const RealtimeChart = createComponent(({ lens }) => {
  const dataStream = lens.useStream()
  
  lens.useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/stream')
    ws.onmessage = (e) => dataStream.push(JSON.parse(e.data))
    
    return () => ws.close()
  }, [])
  
  return <Chart data={dataStream.value} />
})
```

### ⚡ Built-in Animation API

Declarative animations without external libraries:

```jsx
const AnimatedCard = createComponent(({ lens }) => {
  const isOpen = lens.useRefraction(false)
  
  return (
    <div 
      animate={{
        height: isOpen.value ? 'auto' : 0,
        opacity: isOpen.value ? 1 : 0,
        transition: { type: 'spring', stiffness: 300 }
      }}
      onClick={() => isOpen.set(!isOpen.value)}
    >
      <CardContent />
    </div>
  )
})
```

### 🔧 Powerful Compiler

Refract's compiler optimizes your code at build time:

```jsx
// You write this:
const Component = createComponent(({ lens }) => {
  const items = lens.useRefraction([1, 2, 3])
  return items.value.map(item => <Item key={item} value={item} />)
})

// Compiler optimizes to:
// - Automatic memoization
// - Dead code elimination  
// - Bundle size reduction
// - Inline optimizations
```

## 🎭 Refract vs Other Frameworks

### How does Refract compare?

| Feature | Refract | React | Vue | Svelte | Solid |
|---------|---------|--------|-----|--------|-------|
| **Reactivity Model** | Fine-grained signals | Virtual DOM | Proxy-based | Compile-time | Fine-grained signals |
| **Bundle Size** | ~15KB | ~45KB | ~34KB | ~10KB | ~7KB |
| **Learning Curve** | Gentle | Moderate | Gentle | Moderate | Steep |
| **TypeScript Support** | First-class | Good | Good | Good | Excellent |
| **Performance** | Excellent | Good | Good | Excellent | Excellent |
| **DevTools** | Built-in | Extension | Extension | Limited | Extension |
| **Animation API** | Built-in | External | Transition API | Built-in | External |
| **Compiler Optimizations** | Extensive | Limited | Limited | Extensive | Moderate |

### When to Choose Refract

Refract is ideal when you want:

✅ **Maximum Performance** - Fine-grained reactivity with compile-time optimizations  
✅ **Developer Experience** - Clear mental model with powerful tooling  
✅ **Small Bundle Size** - Every KB matters in your application  
✅ **Built-in Features** - Animations, routing, and state management included  
✅ **Future-Proof** - Modern architecture built on web standards  

## 🚀 Getting Started

Ready to dive in? Here's how simple it is to start:

```bash
# Create a new Refract app
npx create-refract-app my-app
cd my-app
npm start
```

Your first Refract component:

```jsx
import { createComponent } from 'refract-js'

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0)
  
  return (
    <div>
      <h1>Count: {count.value}</h1>
      <button onClick={() => count.set(count.value + 1)}>
        Increment
      </button>
    </div>
  )
})

export default Counter
```

## 🎓 Learning Path

Follow our recommended learning path:

1. **[Quick Start](/docs/quickstart)** - Build your first app in 10 minutes
2. **[Core Concepts](/docs/concepts)** - Understand the fundamentals
3. **[Tutorial Series](/docs/tutorials)** - Hands-on guided learning
4. **[API Reference](/docs/api)** - Complete API documentation
5. **[Examples](/docs/examples)** - Learn from real applications

## 🌍 Who's Using Refract?

Refract is trusted by companies and developers worldwide:

<div className="logo-grid">
  <img src="/img/users/techcorp.svg" alt="TechCorp" />
  <img src="/img/users/startup.svg" alt="StartupXYZ" />
  <img src="/img/users/agency.svg" alt="Digital Agency" />
  <img src="/img/users/saas.svg" alt="SaaS Platform" />
</div>

> "Refract transformed how we build UIs. The reactivity model is intuitive, the performance is outstanding, and the developer experience is unmatched." 
> 
> — **Sarah Chen**, Senior Engineer at TechCorp

> "We migrated from React to Refract and saw a 40% reduction in bundle size and 2x improvement in runtime performance."
> 
> — **Mike Johnson**, CTO at StartupXYZ

## 🤝 Join the Community

Become part of the growing Refract community:

- **[Discord](https://discord.gg/refract)** - Chat with 5000+ developers
- **[GitHub](https://github.com/refract-js/refract)** - Contribute to the framework
- **[Twitter](https://twitter.com/refractjs)** - Follow for updates
- **[Blog](https://blog.refract-js.org)** - Technical articles and tutorials
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/refract-js)** - Get answers

## 🛠️ Ecosystem

Refract comes with a rich ecosystem:

### Official Packages
- **@refract/router** - Client-side routing
- **@refract/devtools** - Browser DevTools
- **@refract/testing** - Testing utilities
- **@refract/cli** - Command-line tools
- **@refract/forms** - Form management
- **@refract/animation** - Advanced animations

### Community Tools
- **refract-ui** - Component library
- **refract-query** - Data fetching
- **refract-store** - Global state management
- **refract-i18n** - Internationalization
- **refract-icons** - Icon library

## 📈 The Future of Refract

We're just getting started. Here's what's coming:

### 🚧 In Development
- Native mobile support with Refract Native
- Server Components for ultimate performance
- AI-powered development tools
- WebAssembly optimization layer
- Built-in micro-frontend support

### 🔮 Vision
Our goal is to make Refract the most developer-friendly, performant, and feature-complete framework for building modern web applications. We believe that UI development should be intuitive, enjoyable, and fast.

## 💪 Why Developers Love Refract

### 🎯 Focused API
No decision fatigue. One clear way to do things right.

### ⚡ Blazing Fast
Both in development and production. No compromises.

### 🛠️ Batteries Included
Everything you need is built-in. No configuration hell.

### 📚 Excellent Documentation
Comprehensive guides, examples, and API references.

### 🤝 Vibrant Community
Friendly, helpful, and growing every day.

## 🏁 Ready to Start?

You're now ready to begin your journey with Refract. Whether you're building a simple website or a complex application, Refract provides the tools and patterns you need to succeed.

<div className="cta-buttons">
  <a href="/docs/quickstart" className="button button--primary button--lg">
    Start Building →
  </a>
  <a href="/docs/concepts" className="button button--secondary button--lg">
    Learn Concepts
  </a>
  <a href="https://github.com/refract-js/refract" className="button button--outline button--lg">
    View on GitHub
  </a>
</div>

---

## Quick Links

- 📖 **[Documentation](/docs)** - Everything you need to know
- 🚀 **[Quick Start](/docs/quickstart)** - Get started in minutes
- 💡 **[Examples](/examples)** - See Refract in action
- 🎓 **[Tutorials](/tutorials)** - Step-by-step guides
- 💬 **[Community](/community)** - Join the conversation
- 🛠️ **[Tools](/tools)** - Enhance your workflow

---

*Welcome to Refract. Let's build something amazing together.* ✨
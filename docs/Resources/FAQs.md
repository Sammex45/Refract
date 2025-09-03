<!-- ---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 1
---

# Frequently Asked Questions

## General Questions

### What is Refract and how is it different from React?

Refract is a reactive JavaScript framework that shares React's component philosophy but introduces unique concepts like **refractions** (reactive state units), **lenses** (state bridges), and **optical composition** (modular UI logic patterns). While React uses hooks and state management, Refract provides:

- Native stream-based UI updates for better performance
- Built-in declarative animation API
- Compile-time optimizations through a lightweight compiler
- First-class TypeScript support with better type inference
- More predictable side-effect management

### Is Refract production-ready?

Refract is currently in active development. While the core APIs are stable, we recommend:
- Using it for personal projects and experiments
- Testing thoroughly before deploying to production
- Following our release notes for breaking changes
- Joining our community for support and best practices

### Can I use Refract with my existing React project?

Yes! Refract provides several migration strategies:
1. **Gradual migration**: Use Refract components alongside React components
2. **Island architecture**: Replace specific parts of your app with Refract
3. **Full migration**: Use our automated migration tool (experimental)

See our [Migration Guide](/guides/migration-react) for detailed instructions.

### What browsers does Refract support?

Refract supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, you'll need to include polyfills. Our compiler can automatically inject necessary polyfills based on your target configuration.

## Getting Started

### How do I install Refract?

```bash
# Using npm
npm install refract-js

# Using yarn
yarn add refract-js

# Using pnpm
pnpm add refract-js
```

For a complete setup, we recommend using our CLI:
```bash
npx create-refract-app my-app
cd my-app
npm start
```

### Do I need to use a build tool?

While Refract can work without build tools using CDN links, we strongly recommend using a build tool for:
- JSX transformation
- TypeScript support
- Compile-time optimizations
- Tree shaking
- Hot module replacement

We provide official plugins for Vite, Webpack, and Rollup.

### Can I use JavaScript instead of TypeScript?

Absolutely! Refract works great with both JavaScript and TypeScript. TypeScript provides better IDE support and type safety, but it's completely optional. All our examples are provided in both languages.

## Core Concepts

### What are refractions and how do they work?

Refractions are Refract's reactive state primitives. Think of them as signals that automatically update your UI when their values change:

```javascript
const count = useRefraction(0);
count.set(1); // UI updates automatically
console.log(count.value); // 1
```

They're similar to:
- Svelte stores
- Solid.js signals
- Vue refs
- MobX observables

### How are lenses different from props?

Lenses are a unified interface for accessing props, state, and lifecycle methods within components. They provide:
- Scoped access to component state
- Built-in dependency tracking
- Automatic cleanup
- Better TypeScript inference

```javascript
const MyComponent = createComponent(({ lens }) => {
  // lens provides access to everything
  const state = lens.useRefraction(initialValue);
  const props = lens.props;
  lens.useEffect(() => {}, []);
});
```

### What is optical composition?

Optical composition is Refract's pattern for creating reusable UI logic. Optics are like React hooks but with:
- Automatic dependency caching
- Animation-aware transitions
- Better composition patterns
- Performance optimizations

```javascript
// Create a reusable optic
function useCounter(initial = 0) {
  const count = useRefraction(initial);
  const increment = () => count.set(count.value + 1);
  return { count, increment };
}
```

## Performance

### Is Refract faster than React?

Refract aims to be faster through:
- **Compile-time optimizations**: Our compiler analyzes and optimizes your code
- **Stream-based updates**: More efficient than traditional virtual DOM diffing
- **Automatic memoization**: Smart caching without manual optimization
- **Smaller bundle size**: ~15KB gzipped core library

Benchmarks show 20-40% performance improvements for typical applications, but results vary based on use case.

### How does Refract handle large lists?

Refract provides several strategies for large lists:
1. **Virtual scrolling**: Built-in virtualization support
2. **Pagination**: Stream-based pagination utilities
3. **Lazy rendering**: Render items as they become visible
4. **Keyed updates**: Efficient list reconciliation

```javascript
import { VirtualList } from 'refract/virtual';

<VirtualList 
  items={largeArray}
  itemHeight={50}
  renderItem={(item) => <Item {...item} />}
/>
```

### Does Refract support code splitting?

Yes! Refract supports multiple code splitting strategies:
- Route-based splitting with `@refract/router`
- Component-based splitting with `lazy()`
- Dynamic imports with automatic loading states
- Suspense-like boundaries for async components

## Development

### How do I debug Refract applications?

Refract provides several debugging tools:

1. **DevTools Extension**: Browser extension for inspecting components and state
2. **Debug mode**: Enable verbose logging with `refract.debug = true`
3. **Time-travel debugging**: Replay state changes
4. **Performance profiler**: Identify performance bottlenecks

### Can I use Refract with my favorite CSS framework?

Yes! Refract works with any CSS solution:
- **CSS Modules**: First-class support
- **Tailwind CSS**: Official integration
- **CSS-in-JS**: Emotion, styled-components compatible
- **Sass/Less**: Works with standard build tools
- **CSS frameworks**: Bootstrap, Bulma, Material-UI

### How do I test Refract components?

Refract provides comprehensive testing utilities:

```javascript
import { render, fireEvent } from '@refract/testing';

test('counter increments', async () => {
  const { getByText } = render(<Counter />);
  const button = getByText('Click me');
  
  fireEvent.click(button);
  await waitForRefraction();
  
  expect(getByText('Count: 1')).toBeInTheDocument();
});
```

We support Jest, Vitest, and other popular testing frameworks.

## Advanced Topics

### Does Refract support Server-Side Rendering (SSR)?

Yes! Refract provides built-in SSR support with:
- Streaming SSR for better performance
- Automatic hydration
- Data prefetching
- SEO optimizations

See our [SSR Guide](/advanced/ssr) for implementation details.

### Can I create native mobile apps with Refract?

While Refract is primarily for web applications, you can:
- Use Refract with Capacitor or Cordova for hybrid apps
- Build PWAs with native-like features
- Use our experimental React Native compatibility layer

### How does Refract handle animations?

Refract provides a declarative animation API:

```javascript
const AnimatedBox = createComponent(({ lens }) => {
  const position = lens.useRefraction({ x: 0, y: 0 });
  
  return (
    <div animate={{ 
      x: position.value.x,
      y: position.value.y,
      transition: { type: 'spring', stiffness: 100 }
    }}>
      Animated content
    </div>
  );
});
```

Features include:
- Spring physics
- Keyframe animations
- Gesture-based animations
- FLIP animations
- GPU-accelerated transforms

## Community & Support

### How can I contribute to Refract?

We welcome contributions! You can:
1. Report bugs and request features on GitHub
2. Submit pull requests (see [Contributing Guide](/contributing))
3. Write documentation or blog posts
4. Help others in our Discord community
5. Create and share Refract packages

### Where can I get help?

- **Discord**: Join our community server for real-time help
- **GitHub Discussions**: For longer-form questions
- **Stack Overflow**: Tag questions with `refract-js`
- **Documentation**: Comprehensive guides and API references
- **Examples**: Official example repository

### Is Refract free to use?

Yes! Refract is 100% free and open source under the MIT license. You can use it in personal and commercial projects without any restrictions.

### Who maintains Refract?

Refract is maintained by a core team of developers with contributions from the open-source community. The project is financially supported through:
- GitHub Sponsors
- OpenCollective
- Corporate sponsorships

## Migration

### How difficult is it to migrate from React?

Migration difficulty depends on your app's complexity:
- **Simple apps**: 1-2 days with our migration tool
- **Medium apps**: 1-2 weeks with gradual migration
- **Large apps**: 1-3 months recommended for full migration

Our migration tool handles ~80% of common patterns automatically.

### Can I use React components in Refract?

Yes! Use our compatibility wrapper:

```javascript
import { wrapReactComponent } from '@refract/react-compat';
import ReactComponent from 'some-react-library';

const RefractComponent = wrapReactComponent(ReactComponent);
```

### What about my Redux/MobX/Zustand store?

Refract can work with existing state management solutions during migration. We provide adapters for:
- Redux → Refraction adapter
- MobX → Refraction adapter
- Zustand → Refraction adapter
- Context API → Lens adapter

---
<!-- 
## Still have questions?

Can't find what you're looking for? 

- 📬 [Email us](mailto:support@refract-js.org)
- 💬 [Join our Discord](https://discord.gg/refract)
- 🐛 [Report an issue](https://github.com/refract-js/refract/issues)
- 📖 [Read the documentation](/docs) --> -->
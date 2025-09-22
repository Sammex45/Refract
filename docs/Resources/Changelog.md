---
id: changelog
title: Changelog
sidebar_label: Changelog
sidebar_position: 4
---

# Changelog

All notable changes to Refract will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### In Development

- TypeScript 5.0 support improvements
- Enhanced DevTools with time-travel debugging
- Experimental concurrent rendering features
- WebAssembly-powered compiler optimizations

---

## [1.0.0] - 2024-12-15

### First Stable Release!

After months of development and community feedback, we're excited to announce Refract 1.0! This release marks our commitment to API stability and production readiness.

### Highlights

- **Production Ready**: Stable APIs with semantic versioning guarantee
- **Performance**: 30% faster than beta versions
- **Developer Experience**: New DevTools and improved error messages
- **Documentation**: Complete API documentation and guides
- **Ecosystem**: Official router, testing utilities, and CLI tools

### Added

- Stable public API with backward compatibility guarantee
- Official VSCode extension with IntelliSense support
- Refract DevTools browser extension
- `@refract/router` for client-side routing
- `@refract/testing` utilities for unit and integration testing
- CLI tool `create-refract-app` for project scaffolding
- Comprehensive documentation site
- TypeScript definitions with improved type inference

### Changed

- **Breaking**: Renamed `createRefraction` to `useRefraction` for consistency
- **Breaking**: Lens API now uses dot notation for nested properties
- Improved error messages with actionable suggestions
- Optimized bundle size (15KB gzipped, down from 18KB)
- Enhanced virtual DOM diffing algorithm
- Better tree-shaking support

### Fixed

- Memory leak in subscription cleanup
- Edge case in keyed list updates
- SSR hydration mismatch issues
- TypeScript inference for generic components

### Security

- Updated all dependencies to latest secure versions
- Added CSP (Content Security Policy) support

---

## [0.9.0-beta.5] - 2024-11-20

### Added

- Suspense boundaries for async components
- Error boundary support
- Lazy loading with `lazy()` function
- Portal support for rendering outside component tree
- Fragment shorthand syntax `<></>`

### Changed

- Improved animation performance with GPU acceleration
- Better error recovery in development mode
- Reduced memory footprint for large applications

### Fixed

- Race condition in concurrent updates
- Memory leak when unmounting during animation
- Incorrect batching of microtask updates

---

## [0.9.0-beta.4] - 2024-11-01

### Added

- Server-side rendering (SSR) support
- Streaming SSR with suspense
- Static site generation (SSG) capabilities
- Hydration API for SSR apps
- Built-in meta tag management

### Changed

- Refactored internal scheduler for better performance
- Improved TypeScript generics handling
- Enhanced development warnings

### Fixed

- Context value propagation in deeply nested trees
- Edge case in effect cleanup timing
- Incorrect memoization in certain scenarios

---

## [0.9.0-beta.3] - 2024-10-15

### Added

- Declarative animation API
- Spring physics animations
- Gesture-based animations
- FLIP animations support
- Animation DevTools panel

### Changed

- Rewritten animation engine for 60fps performance
- Better integration with CSS transitions
- Improved animation cleanup

### Fixed

- Animation memory leaks
- Janky animations on low-end devices
- Race conditions in animation chains

---

## [0.9.0-beta.2] - 2024-10-01

### Added

- Global refraction support
- Derived refractions with automatic dependency tracking
- Refraction subscriptions API
- Batch updates with `batch()`
- Computed values with `computed()`

### Changed

- Simplified refraction API
- Better TypeScript inference for refractions
- Optimized subscription management

### Fixed

- Stale closure issues in effects
- Incorrect dependency tracking in complex scenarios
- Memory leaks in global refractions

### Deprecated

- `watchRefraction()` - use `refraction.subscribe()` instead
- `combineRefractions()` - use `computed()` instead

---

## [0.9.0-beta.1] - 2024-09-15

### Added

- Optical composition system
- `useOptic` hook for reusable logic
- Optic caching and memoization
- Animation-aware optics
- Composable optics with `composeOptics()`

### Changed

- Restructured internal architecture for optics
- Improved developer experience with better errors
- Enhanced type safety for optics

### Fixed

- Performance regression in large component trees
- Incorrect re-renders with memo components
- Edge cases in optical composition

---

## [0.8.0-alpha.10] - 2024-09-01

### Added

- Virtual scrolling support
- List virtualization components
- Intersection Observer integration
- Pagination utilities
- Infinite scroll helpers

### Changed

- Optimized list rendering performance
- Better key management for lists
- Improved scroll position restoration

### Fixed

- Scroll jumping in virtual lists
- Incorrect height calculations
- Memory leaks in intersection observers

---

## [0.8.0-alpha.9] - 2024-08-15

### Added

- Built-in form handling utilities
- Form validation API
- Controlled component helpers
- File upload components
- Form state management

### Changed

- Simplified form binding syntax
- Better TypeScript types for forms
- Improved accessibility for form components

### Fixed

- Focus management in forms
- Validation timing issues
- File upload memory leaks

---

## [0.8.0-alpha.8] - 2024-08-01

### Added

- Web Components integration
- Custom elements support
- Shadow DOM compatibility
- Slot projection API

### Changed

- Better interoperability with vanilla JavaScript
- Improved custom element registration
- Enhanced shadow DOM handling

### Fixed

- Style encapsulation issues
- Event propagation in shadow DOM
- Attribute reflection bugs

---

## [0.8.0-alpha.7] - 2024-07-15

### Added

- Concurrent mode (experimental)
- Time slicing for large updates
- Priority-based scheduling
- Interruptible rendering

### Changed

- Rewritten scheduler for concurrent features
- Better responsiveness during heavy updates
- Improved perceived performance

### Fixed

- Priority inversion issues
- Starvation in low-priority updates
- Race conditions in concurrent mode

---

## [0.8.0-alpha.6] - 2024-07-01

### Added

- Development mode enhancements
- Improved error boundaries
- Better stack traces
- Component stack in errors
- Performance profiler

### Changed

- Enhanced debugging experience
- More helpful warning messages
- Better development/production separation

### Fixed

- Source map issues
- Incorrect component names in DevTools
- Performance profiler accuracy

---

## [0.8.0-alpha.5] - 2024-06-15

### Added

- CSS-in-JS support
- Styled components compatibility
- Emotion integration
- CSS modules support
- Theming API

### Changed

- Better style injection handling
- Improved CSS extraction
- Enhanced theme propagation

### Fixed

- Style duplication issues
- CSS specificity problems
- Theme switching glitches

---

## [0.8.0-alpha.4] - 2024-06-01

### Added

- Testing utilities package
- Component testing helpers
- Mock refraction utilities
- Async testing support
- Snapshot testing

### Changed

- Better test isolation
- Improved test performance
- Enhanced assertion helpers

### Fixed

- Timing issues in tests
- Cleanup in test utilities
- False positives in async tests

---

## [0.8.0-alpha.3] - 2024-05-15

### Added

- Router package (experimental)
- Route matching
- Nested routing
- Route guards
- Lazy route loading

### Changed

- Improved route transition handling
- Better history management
- Enhanced route parameter handling

### Fixed

- Route matching edge cases
- History synchronization issues
- Memory leaks in route subscriptions

---

## [0.8.0-alpha.2] - 2024-05-01

### Added

- Stream-based updates
- Observable integration
- Async stream support
- Backpressure handling

### Changed

- Rewritten update mechanism
- Better async handling
- Improved stream performance

### Fixed

- Stream memory leaks
- Backpressure issues
- Race conditions in streams

---

## [0.8.0-alpha.1] - 2024-04-15

### Added

- Initial alpha release
- Core component system
- Basic refraction implementation
- Lens API
- JSX support
- Virtual DOM implementation

### Known Issues

- Limited browser support
- Performance optimizations needed
- Incomplete TypeScript definitions
- Missing documentation

---

## Version Guidelines

### Version Numbers

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features (backward compatible)
- **Patch (0.0.X)**: Bug fixes (backward compatible)

### Release Channels

- **Stable**: Production-ready releases
- **Beta**: Feature-complete, testing needed
- **Alpha**: Early development, unstable
- **Canary**: Nightly builds, very unstable

### Support Policy

- **Current major**: Full support
- **Previous major**: Security updates for 12 months
- **Older versions**: Community support only

---

## Migration Guides

### Migrating to 1.0.0

#### Breaking Changes

1. **Refraction API Change**

   ```javascript
   // Before (0.9.x)
   const count = createRefraction(0);

   // After (1.0.0)
   const count = useRefraction(0);
   ```

2. **Lens Property Access**

   ```javascript
   // Before (0.9.x)
   lens.get("props.value");

   // After (1.0.0)
   lens.props.value;
   ```

3. **Effect Cleanup**

   ```javascript
   // Before (0.9.x)
   lens.useEffect(
     () => {
       // effect
     },
     [],
     () => {
       // cleanup
     }
   );

   // After (1.0.0)
   lens.useEffect(() => {
     // effect
     return () => {
       // cleanup
     };
   }, []);
   ```

#### New Features to Adopt

- Use new DevTools for better debugging
- Migrate to TypeScript for better type safety
- Adopt new testing utilities for better test coverage
- Implement error boundaries for better error handling

#### Deprecation Schedule

The following features are deprecated and will be removed in 2.0.0:

- `watchRefraction()` - use `refraction.subscribe()`
- `combineRefractions()` - use `computed()`
- Legacy context API - use new context system
- Class components - migrate to functional components

---

## Contributing

Found a bug or want to contribute? Check our [Contributing Guide](/contributing).

## License

Refract is [MIT licensed](https://github.com/refract-js/refract/blob/main/LICENSE).

---

[Unreleased]: https://github.com/refract-js/refract/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/refract-js/refract/releases/tag/v1.0.0
[0.9.0-beta.5]: https://github.com/refract-js/refract/releases/tag/v0.9.0-beta.5
[0.9.0-beta.4]: https://github.com/refract-js/refract/releases/tag/v0.9.0-beta.4

Add more version links as needed

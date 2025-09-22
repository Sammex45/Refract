---
id: contributing
title: Contributing to Refract
sidebar_label: Contributing
sidebar_position: 3
---

# Contributing to Refract

First off, thank you for considering contributing to Refract! It's people like you that make Refract such a great framework. We welcome contributions from everyone, regardless of experience level.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](https://github.com/refract-js/refract/blob/main/CODE_OF_CONDUCT.md). Please read it before contributing.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

1. **Clear title and description**
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Code samples** (if applicable)
6. **Environment details**:
   - Refract version
   - Node.js version
   - Browser and version
   - Operating system

**Bug Report Template:**

````markdown
## Description

Brief description of the bug

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Code Sample

```javascript
// Minimal reproduction code
```
````

## Environment

- Refract version:
- Node.js version:
- Browser:
- OS:

````

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

1. **Use case** - Why is this enhancement needed?
2. **Proposed solution** - How should it work?
3. **Alternatives considered** - What other solutions did you consider?
4. **Additional context** - Any mockups, diagrams, or examples

### Pull Requests

1. **Small, focused PRs** are easier to review and merge
2. **One feature/fix per PR**
3. **Include tests** for new features
4. **Update documentation** as needed
5. **Follow our coding standards**
6. **Write clear commit messages**

### Improving Documentation

Documentation improvements are always welcome! This includes:
- Fixing typos or clarifying language
- Adding examples
- Improving API documentation
- Translating documentation
- Writing tutorials or blog posts

### Contributing Examples

Share your Refract projects and examples:
1. Add to the `/examples` directory
2. Include a README with setup instructions
3. Keep dependencies minimal
4. Follow our code style

## Development Setup

### Prerequisites

- Node.js 16+ and npm 7+
- Git
- A code editor (VS Code recommended)
- Basic knowledge of JavaScript/TypeScript

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/refract.git
   cd refract
````

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/refract-js/refract.git
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Build the project**

   ```bash
   npm run build
   ```

5. **Run tests**

   ```bash
   npm test
   ```

6. **Start development mode**
   ```bash
   npm run dev
   ```

### Development Tools

#### VS Code Extensions

We recommend these extensions for the best development experience:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Jest Runner
- GitLens

#### Editor Configuration

`.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Project Structure

```
refract/
├── packages/
│   ├── core/              # Core framework
│   │   ├── src/
│   │   ├── tests/
│   │   └── package.json
│   ├── compiler/          # Compiler and build tools
│   ├── devtools/          # Browser DevTools
│   ├── router/            # Official router
│   └── testing/           # Testing utilities
├── examples/              # Example applications
├── docs/                  # Documentation
├── scripts/               # Build and release scripts
├── benchmarks/            # Performance benchmarks
└── playground/            # Development playground
```

### Key Directories

- **`packages/core/src`** - Core framework source code
- **`packages/core/src/refraction`** - Reactivity system
- **`packages/core/src/lens`** - Lens implementation
- **`packages/core/src/components`** - Component system
- **`packages/compiler`** - Build-time optimizations

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Write code
   - Add tests
   - Update documentation

3. **Test your changes**

   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Working on Core

When modifying core functionality:

1. **Run core tests**

   ```bash
   npm run test:core
   ```

2. **Test in playground**

   ```bash
   npm run playground
   ```

3. **Check bundle size**

   ```bash
   npm run size
   ```

4. **Run benchmarks**
   ```bash
   npm run bench
   ```

### Debugging

1. **Enable debug mode**

   ```javascript
   window.__REFRACT_DEBUG__ = true;
   ```

2. **Use DevTools**

   - Install Refract DevTools extension
   - Open browser DevTools
   - Navigate to "Refract" tab

3. **Add debug statements**
   ```javascript
   import { debug } from "@refract/core/debug";
   debug("component", "Component rendered", props);
   ```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific package tests
npm run test:core
npm run test:compiler
npm run test:router

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

1. **Unit Tests** - Test individual functions

   ```javascript
   describe("useRefraction", () => {
     it("should initialize with default value", () => {
       const { result } = renderHook(() => useRefraction(0));
       expect(result.current.value).toBe(0);
     });
   });
   ```

2. **Integration Tests** - Test component interactions

   ```javascript
   it("should update child when parent state changes", async () => {
     const { getByText } = render(<ParentComponent />);
     fireEvent.click(getByText("Update"));
     await waitFor(() => {
       expect(getByText("Updated")).toBeInTheDocument();
     });
   });
   ```

3. **E2E Tests** - Test full user flows
   ```javascript
   test("user can complete checkout", async ({ page }) => {
     await page.goto("/shop");
     await page.click('[data-testid="add-to-cart"]');
     await page.click('[data-testid="checkout"]');
     // ... more steps
   });
   ```

### Test Guidelines

- Write tests before fixing bugs
- Aim for >80% code coverage
- Test edge cases and error conditions
- Use descriptive test names
- Keep tests focused and isolated

## Submitting Changes

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or changes
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

**Examples:**

```bash
feat(core): add support for async refractions
fix(compiler): resolve JSX transformation issue
docs(api): update useRefraction documentation
perf(core): optimize virtual DOM diffing
```

### Pull Request Process

1. **Update your fork**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**

   ```bash
   git push origin feature/your-feature
   ```

3. **Create Pull Request**

   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

4. **PR Template:**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing

   - [ ] Tests pass locally
   - [ ] Added new tests
   - [ ] Updated documentation

   ## Screenshots (if applicable)

   ## Related Issues

   Closes #123
   ```

5. **Address Review Feedback**
   - Make requested changes
   - Push updates
   - Reply to comments
   - Request re-review

## Style Guidelines

### JavaScript/TypeScript

- Use TypeScript for new code
- Follow ESLint configuration
- Use Prettier for formatting
- Prefer functional programming patterns
- Avoid mutations when possible

```javascript
// ✅ Good
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, key: value };

// ❌ Bad
oldArray.push(newItem);
oldObject.key = value;
```

### Naming Conventions

- **Files**: `kebab-case.ts`
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

### Code Organization

```javascript
// 1. Imports
import { external } from "package";
import { internal } from "@/internal";
import { relative } from "./relative";

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Constants
const DEFAULT_VALUE = 10;

// 4. Component/Function
export function Component() {
  // ...
}

// 5. Exports
export { Component };
```

## Documentation

### Writing Documentation

1. **API Documentation**

   - Use JSDoc comments
   - Include examples
   - Document parameters and return values

   ```javascript
   /**
    * Creates a new refraction with the given initial value
    * @param {T} initialValue - The initial value
    * @returns {Refraction<T>} The refraction object
    * @example
    * const count = useRefraction(0);
    * count.set(1);
    */
   ```

2. **Guide Documentation**

   - Use clear, simple language
   - Include code examples
   - Add diagrams where helpful
   - Test all code samples

3. **README Files**
   - Every package needs a README
   - Include installation instructions
   - Provide usage examples
   - List API methods

### Documentation Standards

- Use American English spelling
- Write in present tense
- Use active voice
- Keep sentences concise
- Include links to related topics

## Community

### Getting Help

- **Discord**: [Join our server](https://discord.gg/refract)
- **Discussions**: [GitHub Discussions](https://github.com/refract-js/refract/discussions)
- **Twitter**: [@refractjs](https://twitter.com/refractjs)
- **Email**: dev@refract-js.org

### Core Team

Our core maintainers are:

- @maintainer1 - Core architecture
- @maintainer2 - Compiler & optimization
- @maintainer3 - DevTools & DX
- @maintainer4 - Documentation & community

### Recognition

Contributors are recognized in:

- Our [Contributors](https://github.com/refract-js/refract/graphs/contributors) page
- Release notes
- Annual contributor spotlight
- Special Discord role

## License

By contributing to Refract, you agree that your contributions will be licensed under the MIT License.

---

## Quick Links

- [Project Homepage](https://refract-js.org)
- [Documentation](https://docs.refract-js.org)
- [Issue Tracker](https://github.com/refract-js/refract/issues)
- [Discord Community](https://discord.gg/refract)
- [Development Guide](https://github.com/refract-js/refract/wiki/Development-Guide)

---

**Thank you for contributing to Refract! Together, we're building the future of reactive UI development.**

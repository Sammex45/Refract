---
sidebar_position: 1
---


# Installation

Get up and running with Refract in minutes. This guide covers all installation methods, from quick starts to advanced configurations.

## 📋 Prerequisites

Before installing Refract, ensure you have the following:

### System Requirements

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Check Your Environment

```bash
# Check Node.js version
node --version
# Should output v16.0.0 or higher

# Check npm version
npm --version
# Should output 7.0.0 or higher

# Or check yarn version (optional)
yarn --version
# Should output 1.22.0 or higher

# Or check pnpm version (optional)
pnpm --version
# Should output 6.0.0 or higher
```

### Installing Node.js

If you don't have Node.js installed:

**Option 1: Official Installer**
- Download from [nodejs.org](https://nodejs.org/)
- Choose LTS version for stability
- Run installer and follow prompts

**Option 2: Using NVM (Node Version Manager)**
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node

# Windows (using nvm-windows)
# Download from: https://github.com/coreybutler/nvm-windows
nvm install latest
nvm use latest
```

## 🚀 Quick Start

The fastest way to get started with Refract:

### Using Create Refract App

```bash
# With npm
npx create-refract-app my-app
cd my-app
npm start

# With yarn
yarn create refract-app my-app
cd my-app
yarn start

# With pnpm
pnpm create refract-app my-app
cd my-app
pnpm start
```

This creates a new Refract project with:
- ✅ Pre-configured build setup
- ✅ Development server with hot reload
- ✅ Basic project structure
- ✅ Example components
- ✅ Testing setup

Your app will be available at `http://localhost:3000`

### Quick Start Options

```bash
# TypeScript template
npx create-refract-app my-app --typescript

# With routing
npx create-refract-app my-app --router

# Full-featured template
npx create-refract-app my-app --template full

# PWA template
npx create-refract-app my-app --template pwa

# Minimal template
npx create-refract-app my-app --template minimal
```

## 📦 Manual Installation

For existing projects or custom setups:

### Core Package

```bash
# npm
npm install refract-js

# yarn
yarn add refract-js

# pnpm
pnpm add refract-js
```

### Additional Packages

```bash
# Router (for single-page applications)
npm install @refract/router

# DevTools (for debugging)
npm install --save-dev @refract/devtools

# Testing utilities
npm install --save-dev @refract/testing

# CLI tools
npm install --save-dev @refract/cli
```

### Development Dependencies

```bash
# Build tools (choose one)
npm install --save-dev vite @refract/vite-plugin
# OR
npm install --save-dev webpack @refract/webpack-loader
# OR
npm install --save-dev @refract/rollup-plugin rollup

# TypeScript support
npm install --save-dev typescript @types/refract

# Linting and formatting
npm install --save-dev eslint @refract/eslint-config
npm install --save-dev prettier @refract/prettier-config
```

## ⚙️ Configuration

### Basic Configuration

#### package.json

```json
{
  "name": "my-refract-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "refract dev",
    "build": "refract build",
    "preview": "refract preview",
    "test": "refract test",
    "lint": "eslint src"
  },
  "dependencies": {
    "refract-js": "^1.0.0"
  },
  "devDependencies": {
    "@refract/cli": "^1.0.0",
    "@refract/devtools": "^1.0.0"
  }
}
```

#### refract.config.js

```javascript
export default {
  // Project root directory
  root: process.cwd(),
  
  // Development server options
  server: {
    port: 3000,
    host: 'localhost',
    open: true, // Open browser on start
  },
  
  // Build options
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true,
    target: 'es2020',
  },
  
  // Compiler options
  compiler: {
    // Enable experimental features
    experimental: {
      streams: true,
      concurrentMode: false,
    },
    // Optimization level (0-3)
    optimizationLevel: 2,
  },
  
  // Path aliases
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
}
```

### TypeScript Configuration

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "jsxImportSource": "refract-js",
    
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    
    "types": ["refract-js", "@refract/testing", "node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🛠️ Build Tool Integration

### Vite

#### vite.config.js

```javascript
import { defineConfig } from 'vite'
import refract from '@refract/vite-plugin'

export default defineConfig({
  plugins: [
    refract({
      // Plugin options
      typescript: true,
      hot: true,
      devtools: true,
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
  },
})
```

### Webpack

#### webpack.config.js

```javascript
const RefractPlugin = require('@refract/webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: '@refract/webpack-loader',
          options: {
            typescript: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new RefractPlugin({
      devtools: process.env.NODE_ENV === 'development',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

### Rollup

#### rollup.config.js

```javascript
import refract from '@refract/rollup-plugin'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    refract({
      typescript: true,
      optimizationLevel: 2,
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
}
```

## 🏗️ Project Structure

### Recommended Structure

```
my-refract-app/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Layout.jsx
│   ├── optics/            # Custom optics (hooks)
│   │   ├── useAuth.js
│   │   └── useTheme.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── utils/             # Utility functions
│   │   └── helpers.js
│   ├── styles/            # Global styles
│   │   └── main.css
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── public/                # Static assets
│   ├── index.html
│   └── favicon.ico
├── tests/                 # Test files
│   ├── unit/
│   └── integration/
├── dist/                  # Build output (generated)
├── node_modules/          # Dependencies (generated)
├── .gitignore
├── package.json
├── refract.config.js      # Refract configuration
├── tsconfig.json          # TypeScript config (if using TS)
└── README.md
```

### Entry Point (main.jsx)

```javascript
import { createApp } from 'refract-js'
import App from './App'
import './styles/main.css'

// Create and mount the app
createApp(App).mount('#app')

// With options
createApp(App, {
  // Global configuration
  strict: true,
  devtools: process.env.NODE_ENV === 'development',
}).mount('#app')
```

### HTML Template (public/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Refract App</title>
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

## 🌐 CDN Installation

For quick prototyping or learning without build tools:

### Basic Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Refract CDN Example</title>
</head>
<body>
  <div id="app"></div>
  
  <!-- Development version (with helpful warnings) -->
  <script src="https://unpkg.com/refract-js@latest/dist/refract.development.js"></script>
  
  <!-- Production version (minified) -->
  <!-- <script src="https://unpkg.com/refract-js@latest/dist/refract.production.min.js"></script> -->
  
  <script type="module">
    const { createApp, createComponent, useRefraction } = Refract;
    
    const App = createComponent(({ lens }) => {
      const count = lens.useRefraction(0);
      
      return Refract.h('div', {}, [
        Refract.h('h1', {}, `Count: ${count.value}`),
        Refract.h('button', {
          onClick: () => count.set(count.value + 1)
        }, 'Increment')
      ]);
    });
    
    createApp(App).mount('#app');
  </script>
</body>
</html>
```

### Using ES Modules

```html
<script type="module">
  import { createApp, createComponent } from 'https://esm.sh/refract-js@latest'
  
  // Your code here
</script>
```

## 🔧 Platform-Specific Setup

### Electron

```bash
npm install refract-js electron

# package.json
{
  "main": "main.js",
  "scripts": {
    "electron": "electron ."
  }
}
```

### React Native (Experimental)

```bash
npm install refract-js @refract/react-native

# Enable experimental features
export REFRACT_EXPERIMENTAL_RN=true
```

### Capacitor (Mobile)

```bash
npm install refract-js @capacitor/core @capacitor/cli

npx cap init
npx cap add ios
npx cap add android
```

## ✅ Verification

### Verify Installation

Create a test file `test-refract.js`:

```javascript
import { createComponent, useRefraction } from 'refract-js'

const TestComponent = createComponent(({ lens }) => {
  const message = lens.useRefraction('Refract is working!')
  console.log(message.value)
  return null
})

console.log('✅ Refract imported successfully')
console.log('Version:', Refract.version)
```

Run verification:

```bash
node test-refract.js
# Should output:
# ✅ Refract imported successfully
# Version: 1.0.0
# Refract is working!
```

### Browser DevTools

1. Install Refract DevTools extension
2. Open your app in the browser
3. Open Developer Tools (F12)
4. Look for "Refract" tab
5. You should see component tree and state

## 🚨 Troubleshooting

### Common Issues

#### Module Not Found

```bash
# Error: Cannot find module 'refract-js'
# Solution: Install the package
npm install refract-js
```

#### JSX Not Transforming

```javascript
// Error: Unexpected token '<'
// Solution: Configure your build tool for JSX

// For Vite, ensure plugin is configured:
import refract from '@refract/vite-plugin'

// For TypeScript, set in tsconfig.json:
"jsx": "preserve",
"jsxImportSource": "refract-js"
```

#### Port Already in Use

```bash
# Error: Port 3000 is already in use
# Solution: Use a different port
npm run dev -- --port 3001

# Or kill the process using the port
# macOS/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Permission Errors

```bash
# Error: EACCES permission denied
# Solution: Fix npm permissions

# Option 1: Change npm's default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

# Option 2: Use a Node version manager (recommended)
# Install nvm and reinstall Node
```

### Getting Help

If you encounter issues:

1. Check the [FAQ](/faq) for common questions
2. Search [GitHub Issues](https://github.com/refract-js/refract/issues)
3. Ask in [Discord](https://discord.gg/refract)
4. Post on [Stack Overflow](https://stackoverflow.com/questions/tagged/refract-js)

## 🎯 Next Steps

Now that Refract is installed:

1. **[Quick Start Tutorial](/docs/quick-start)** - Build your first app
2. **[Core Concepts](/docs/concepts)** - Understand the fundamentals
3. **[Examples](/examples)** - Learn from sample projects
4. **[API Reference](/api)** - Explore the full API
5. **[DevTools Guide](/docs/devtools)** - Master debugging

---

**Congratulations!** You've successfully installed Refract. Start building amazing reactive applications! 🚀
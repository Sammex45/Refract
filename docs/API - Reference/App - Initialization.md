---
sidebar_position: 4
---
# App - Initialization

### Installation
```bash
npm install refract-js
```

### File Structure
```
my-app/
  ├── src/
  │   ├── components/
  │   ├── optics/
  │   ├── app.js
  │   └── index.js
  └── package.json
```

### Entry Point
```js
import { createApp } from 'refract';
import { Counter } from './components/Counter';

createApp(Counter).mount('#root');
```

- **`createApp(rootComponent)`**
  - Bootstraps the Refract application
  - Mounts to a DOM node
  - Handles refraction lifecycle

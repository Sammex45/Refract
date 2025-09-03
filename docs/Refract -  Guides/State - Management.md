---
sidebar_position: 1
---


# State Management

State management is at the heart of every reactive application. Refract provides a powerful yet simple state management system through **refractions** - reactive state primitives that automatically update your UI when values change. No Redux, no MobX, no complexity - just clarity.

## 🔮 Core Concepts

### What is State?

State represents data that changes over time in your application:
- User input (forms, selections)
- Server data (API responses)
- UI state (modals, toggles, filters)
- Application state (authentication, preferences)

### The Refract Approach

Refract's state management is built on three principles:

1. **Simplicity**: State should be easy to create and update
2. **Reactivity**: UI should automatically reflect state changes
3. **Locality**: State should live close to where it's used

```jsx
// This is all you need for reactive state
const Component = createComponent(({ lens }) => {
  const count = lens.useRefraction(0)
  
  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicked {count.value} times
    </button>
  )
})
```

## 🌟 Local State with Refractions

### Creating State

Use `lens.useRefraction()` to create reactive state within components:

```jsx
const TodoApp = createComponent(({ lens }) => {
  // Primitive values
  const text = lens.useRefraction('')
  const count = lens.useRefraction(0)
  const isActive = lens.useRefraction(true)
  
  // Objects
  const user = lens.useRefraction({
    name: 'John',
    email: 'john@example.com'
  })
  
  // Arrays
  const todos = lens.useRefraction([
    { id: 1, text: 'Learn Refract', done: false },
    { id: 2, text: 'Build app', done: false }
  ])
  
  // Dates, Maps, Sets
  const selectedDate = lens.useRefraction(new Date())
  const cache = lens.useRefraction(new Map())
  const tags = lens.useRefraction(new Set(['react', 'refract']))
  
  return <div>{/* Your UI */}</div>
})
```

### Reading State

Access state values with the `.value` property:

```jsx
const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(10)
  
  return (
    <div>
      <p>Current count: {count.value}</p>
      <p>Double: {count.value * 2}</p>
      <p>Is even: {count.value % 2 === 0 ? 'Yes' : 'No'}</p>
    </div>
  )
})
```

### Updating State

Use the `.set()` method to update state:

```jsx
const Profile = createComponent(({ lens }) => {
  const user = lens.useRefraction({ name: '', age: 0 })
  
  const updateName = (newName) => {
    // Replace entire object
    user.set({ ...user.value, name: newName })
  }
  
  const incrementAge = () => {
    // Update based on current value
    user.set({ ...user.value, age: user.value.age + 1 })
  }
  
  return (
    <div>
      <input 
        value={user.value.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <button onClick={incrementAge}>
        Birthday! (Age: {user.value.age})
      </button>
    </div>
  )
})
```

### State Update Patterns

Common patterns for updating different types of state:

```jsx
const StatePatterns = createComponent(({ lens }) => {
  const todos = lens.useRefraction([])
  const filters = lens.useRefraction({ search: '', category: 'all' })
  const selected = lens.useRefraction(new Set())
  
  // Array operations
  const addTodo = (text) => {
    todos.set([...todos.value, { id: Date.now(), text, done: false }])
  }
  
  const removeTodo = (id) => {
    todos.set(todos.value.filter(todo => todo.id !== id))
  }
  
  const updateTodo = (id, updates) => {
    todos.set(todos.value.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ))
  }
  
  // Object updates
  const updateFilter = (key, value) => {
    filters.set({ ...filters.value, [key]: value })
  }
  
  // Set operations
  const toggleSelection = (id) => {
    const newSet = new Set(selected.value)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    selected.set(newSet)
  }
  
  return <div>{/* UI */}</div>
})
```

## 🌍 Global State

### Creating Global Refractions

Global state that persists across components:

```jsx
// stores/auth.js
import { globalRefraction } from 'refract-js'

export const currentUser = globalRefraction(null)
export const isAuthenticated = globalRefraction(false)
export const permissions = globalRefraction(new Set())

// stores/theme.js
export const theme = globalRefraction('light')
export const primaryColor = globalRefraction('#667eea')

// stores/app.js
export const notifications = globalRefraction([])
export const isLoading = globalRefraction(false)
export const currentRoute = globalRefraction('/')
```

### Using Global State

Import and use global refractions in any component:

```jsx
import { currentUser, isAuthenticated } from './stores/auth'
import { theme } from './stores/theme'

const Header = createComponent(({ lens }) => {
  // Global state works like local state
  const user = currentUser
  const authenticated = isAuthenticated
  const currentTheme = theme
  
  const logout = () => {
    currentUser.set(null)
    isAuthenticated.set(false)
  }
  
  const toggleTheme = () => {
    theme.set(theme.value === 'light' ? 'dark' : 'light')
  }
  
  return (
    <header className={`theme-${currentTheme.value}`}>
      {authenticated.value ? (
        <div>
          Welcome, {user.value?.name}!
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => isAuthenticated.set(true)}>
          Login
        </button>
      )}
      <button onClick={toggleTheme}>
        🌓 Toggle Theme
      </button>
    </header>
  )
})
```

### Global State Patterns

Organize global state with modules:

```jsx
// stores/index.js
import { globalRefraction } from 'refract-js'

// Create a store module
export const createStore = (name, initialState) => {
  const state = globalRefraction(initialState)
  
  return {
    state,
    // Add computed values
    get value() { return state.value },
    // Add actions
    reset: () => state.set(initialState),
    // Add subscriptions
    subscribe: (callback) => state.subscribe(callback)
  }
}

// Create stores
export const cartStore = createStore('cart', {
  items: [],
  total: 0
})

export const userStore = createStore('user', {
  profile: null,
  preferences: {},
  session: null
})

// Usage in components
const Cart = createComponent(({ lens }) => {
  const cart = cartStore.state
  
  const addItem = (product) => {
    const newItems = [...cart.value.items, product]
    const total = newItems.reduce((sum, item) => sum + item.price, 0)
    cart.set({ items: newItems, total })
  }
  
  return (
    <div>
      <p>Items: {cart.value.items.length}</p>
      <p>Total: ${cart.value.total}</p>
    </div>
  )
})
```

## 🔄 Derived State

### Computed Values

Create values that automatically update when dependencies change:

```jsx
const ShoppingCart = createComponent(({ lens }) => {
  const items = lens.useRefraction([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29, quantity: 2 }
  ])
  
  const taxRate = lens.useRefraction(0.08)
  
  // Computed values - automatically update
  const subtotal = lens.useComputed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )
  
  const tax = lens.useComputed(() => 
    subtotal.value * taxRate.value
  )
  
  const total = lens.useComputed(() => 
    subtotal.value + tax.value
  )
  
  return (
    <div>
      <h3>Shopping Cart</h3>
      <p>Subtotal: ${subtotal.value.toFixed(2)}</p>
      <p>Tax ({(taxRate.value * 100).toFixed(0)}%): ${tax.value.toFixed(2)}</p>
      <p>Total: ${total.value.toFixed(2)}</p>
    </div>
  )
})
```

### Derived Refractions

Create refractions that derive from other refractions:

```jsx
import { derivedRefraction } from 'refract-js'

// Base refractions
const firstName = globalRefraction('John')
const lastName = globalRefraction('Doe')

// Derived refraction
const fullName = derivedRefraction(
  [firstName, lastName],
  ([first, last]) => `${first} ${last}`
)

// Bidirectional derived state
const celsius = globalRefraction(0)
const fahrenheit = derivedRefraction(
  [celsius],
  ([c]) => c * 9/5 + 32,
  (f) => celsius.set((f - 32) * 5/9)  // Optional setter
)

const TemperatureConverter = createComponent(({ lens }) => {
  return (
    <div>
      <input
        type="number"
        value={celsius.value}
        onChange={(e) => celsius.set(Number(e.target.value))}
      />°C = 
      <input
        type="number"
        value={fahrenheit.value}
        onChange={(e) => fahrenheit.set(Number(e.target.value))}
      />°F
    </div>
  )
})
```

## 🎯 Advanced State Patterns

### State Machines

Implement finite state machines for complex logic:

```jsx
const createStateMachine = (config) => {
  const currentState = globalRefraction(config.initial)
  
  const transition = (event) => {
    const state = currentState.value
    const nextState = config.states[state]?.on?.[event]
    
    if (nextState) {
      // Run exit action
      config.states[state]?.exit?.()
      
      // Transition
      currentState.set(nextState)
      
      // Run entry action
      config.states[nextState]?.entry?.()
    }
  }
  
  return { currentState, transition }
}

// Define state machine
const formMachine = createStateMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { START: 'filling' },
      entry: () => console.log('Form ready')
    },
    filling: {
      on: { 
        SUBMIT: 'validating',
        CANCEL: 'idle'
      }
    },
    validating: {
      on: {
        VALID: 'submitting',
        INVALID: 'filling'
      },
      entry: () => console.log('Validating...')
    },
    submitting: {
      on: {
        SUCCESS: 'complete',
        ERROR: 'filling'
      },
      entry: () => console.log('Submitting...')
    },
    complete: {
      entry: () => console.log('Form submitted!')
    }
  }
})

const Form = createComponent(({ lens }) => {
  const { currentState, transition } = formMachine
  
  return (
    <div>
      <p>State: {currentState.value}</p>
      <button onClick={() => transition('START')}>Start</button>
      <button onClick={() => transition('SUBMIT')}>Submit</button>
      {/* Form UI based on state */}
    </div>
  )
})
```

### Undo/Redo

Implement undo/redo functionality:

```jsx
const createUndoable = (initialValue) => {
  const history = globalRefraction([initialValue])
  const currentIndex = globalRefraction(0)
  
  const current = derivedRefraction(
    [history, currentIndex],
    ([hist, idx]) => hist[idx]
  )
  
  const set = (newValue) => {
    // Remove any future history
    const newHistory = history.value.slice(0, currentIndex.value + 1)
    newHistory.push(newValue)
    history.set(newHistory)
    currentIndex.set(newHistory.length - 1)
  }
  
  const undo = () => {
    if (currentIndex.value > 0) {
      currentIndex.set(currentIndex.value - 1)
    }
  }
  
  const redo = () => {
    if (currentIndex.value < history.value.length - 1) {
      currentIndex.set(currentIndex.value + 1)
    }
  }
  
  const canUndo = derivedRefraction(
    [currentIndex],
    ([idx]) => idx > 0
  )
  
  const canRedo = derivedRefraction(
    [currentIndex, history],
    ([idx, hist]) => idx < hist.length - 1
  )
  
  return { current, set, undo, redo, canUndo, canRedo }
}

const TextEditor = createComponent(({ lens }) => {
  const editor = createUndoable('')
  
  return (
    <div>
      <div>
        <button onClick={editor.undo} disabled={!editor.canUndo.value}>
          ↶ Undo
        </button>
        <button onClick={editor.redo} disabled={!editor.canRedo.value}>
          ↷ Redo
        </button>
      </div>
      <textarea
        value={editor.current.value}
        onChange={(e) => editor.set(e.target.value)}
        rows={10}
        cols={50}
      />
    </div>
  )
})
```

### Optimistic Updates

Handle optimistic UI updates for better UX:

```jsx
const createOptimisticState = (initialValue, updateFn) => {
  const actualValue = globalRefraction(initialValue)
  const optimisticValue = globalRefraction(initialValue)
  const pending = globalRefraction(false)
  
  const update = async (newValue) => {
    // Optimistically update UI
    optimisticValue.set(newValue)
    pending.set(true)
    
    try {
      // Perform actual update
      const result = await updateFn(newValue)
      actualValue.set(result)
      optimisticValue.set(result)
    } catch (error) {
      // Revert on error
      optimisticValue.set(actualValue.value)
      throw error
    } finally {
      pending.set(false)
    }
  }
  
  return {
    value: optimisticValue,
    pending,
    update
  }
}

const TodoList = createComponent(({ lens }) => {
  const todos = createOptimisticState([], async (newTodos) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodos)
    })
    return response.json()
  })
  
  const addTodo = (text) => {
    const newTodos = [...todos.value.value, { 
      id: Date.now(), 
      text, 
      done: false 
    }]
    todos.update(newTodos)
  }
  
  return (
    <div>
      {todos.pending.value && <p>Saving...</p>}
      {todos.value.value.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  )
})
```

## 🔗 State Synchronization

### Local Storage Sync

Automatically sync state with localStorage:

```jsx
const createPersistedRefraction = (key, initialValue) => {
  // Load from localStorage
  const stored = localStorage.getItem(key)
  const initial = stored ? JSON.parse(stored) : initialValue
  
  const refraction = globalRefraction(initial)
  
  // Save to localStorage on change
  refraction.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value))
  })
  
  return refraction
}

// Usage
const preferences = createPersistedRefraction('user-preferences', {
  theme: 'light',
  language: 'en',
  notifications: true
})

const Settings = createComponent(({ lens }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={preferences.value.notifications}
          onChange={(e) => preferences.set({
            ...preferences.value,
            notifications: e.target.checked
          })}
        />
        Enable notifications
      </label>
    </div>
  )
})
```

### URL State Sync

Sync state with URL parameters:

```jsx
const createURLRefraction = (param, initialValue) => {
  const url = new URL(window.location)
  const initial = url.searchParams.get(param) || initialValue
  
  const refraction = globalRefraction(initial)
  
  refraction.subscribe((value) => {
    const url = new URL(window.location)
    url.searchParams.set(param, value)
    window.history.replaceState({}, '', url)
  })
  
  // Listen for browser navigation
  window.addEventListener('popstate', () => {
    const url = new URL(window.location)
    const value = url.searchParams.get(param)
    if (value !== null) refraction.set(value)
  })
  
  return refraction
}

// Usage
const searchQuery = createURLRefraction('q', '')
const currentPage = createURLRefraction('page', '1')

const SearchResults = createComponent(({ lens }) => {
  return (
    <div>
      <input
        type="search"
        value={searchQuery.value}
        onChange={(e) => searchQuery.set(e.target.value)}
        placeholder="Search..."
      />
      <p>Page {currentPage.value}</p>
      <button onClick={() => currentPage.set(String(Number(currentPage.value) + 1))}>
        Next Page
      </button>
    </div>
  )
})
```

### WebSocket State Sync

Real-time state synchronization:

```jsx
const createRealtimeRefraction = (channel, initialValue) => {
  const refraction = globalRefraction(initialValue)
  const ws = new WebSocket(`wss://api.example.com/${channel}`)
  
  // Receive updates
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    refraction.set(data)
  }
  
  // Send updates
  const originalSet = refraction.set
  refraction.set = (value) => {
    originalSet(value)
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(value))
    }
  }
  
  return refraction
}

// Usage
const collaborativeDoc = createRealtimeRefraction('doc/123', {
  content: '',
  users: []
})

const CollaborativeEditor = createComponent(({ lens }) => {
  return (
    <div>
      <div>Active users: {collaborativeDoc.value.users.length}</div>
      <textarea
        value={collaborativeDoc.value.content}
        onChange={(e) => collaborativeDoc.set({
          ...collaborativeDoc.value,
          content: e.target.value
        })}
      />
    </div>
  )
})
```

## 🎨 State DevTools

### Debugging State

Enable state debugging in development:

```jsx
// Enable debug mode
if (process.env.NODE_ENV === 'development') {
  window.__REFRACT_DEBUG__ = true
  
  // Log all state changes
  globalRefraction.prototype.set = function(value) {
    console.log(`[State Change] ${this.name}:`, {
      old: this.value,
      new: value,
      stack: new Error().stack
    })
    this._set(value)
  }
}

// Name your refractions for better debugging
const userState = globalRefraction(null)
userState.name = 'userState'

const cartState = globalRefraction([])
cartState.name = 'cartState'
```

### State Inspector

Create a state inspector component:

```jsx
const StateInspector = createComponent(({ lens }) => {
  const states = lens.useRefraction({})
  
  lens.useEffect(() => {
    // Collect all global refractions
    const refractions = window.__REFRACT_REFRACTIONS__ || {}
    states.set(refractions)
    
    // Update on changes
    const interval = setInterval(() => {
      const current = {}
      Object.entries(refractions).forEach(([key, ref]) => {
        current[key] = ref.value
      })
      states.set(current)
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'black',
      color: 'green',
      padding: '10px',
      fontFamily: 'monospace',
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      <h3>State Inspector</h3>
      <pre>{JSON.stringify(states.value, null, 2)}</pre>
    </div>
  )
})
```

## 📚 Best Practices

### 1. Keep State Minimal
Only store what you can't derive:

```jsx
// ❌ Bad - storing derived values
const state = lens.useRefraction({
  items: [],
  count: 0,        // Can be derived
  isEmpty: true,   // Can be derived
  total: 0        // Can be derived
})

// ✅ Good - derive what you can
const items = lens.useRefraction([])
const count = items.value.length
const isEmpty = items.value.length === 0
const total = items.value.reduce((sum, item) => sum + item.price, 0)
```

### 2. Co-locate State
Keep state close to where it's used:

```jsx
// ❌ Bad - global state for local concerns
const globalModalOpen = globalRefraction(false)

// ✅ Good - local state for local UI
const Modal = createComponent(({ lens }) => {
  const isOpen = lens.useRefraction(false)
  // Modal logic
})
```

### 3. Normalize Complex State
Structure state for easy updates:

```jsx
// ❌ Bad - nested arrays
const state = lens.useRefraction({
  users: [
    { id: 1, name: 'John', posts: [...] }
  ]
})

// ✅ Good - normalized structure  
const state = lens.useRefraction({
  users: { 1: { id: 1, name: 'John' } },
  posts: { 1: { id: 1, userId: 1, text: '...' } },
  userPosts: { 1: [1, 2, 3] }
})
```

### 4. Use Immutable Updates
Always create new objects/arrays:

```jsx
// ❌ Bad - mutating state
state.value.push(newItem)
state.set(state.value)

// ✅ Good - immutable update
state.set([...state.value, newItem])
```

## 🎯 Common Patterns

### Form State Management

```jsx
const useForm = (initialValues = {}) => {
  const values = useRefraction(initialValues)
  const errors = useRefraction({})
  const touched = useRefraction({})
  const submitting = useRefraction(false)
  
  const setFieldValue = (name, value) => {
    values.set({ ...values.value, [name]: value })
  }
  
  const setFieldError = (name, error) => {
    errors.set({ ...errors.value, [name]: error })
  }
  
  const setFieldTouched = (name) => {
    touched.set({ ...touched.value, [name]: true })
  }
  
  const handleSubmit = async (onSubmit) => {
    submitting.set(true)
    try {
      await onSubmit(values.value)
    } finally {
      submitting.set(false)
    }
  }
  
  return {
    values,
    errors,
    touched,
    submitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleSubmit
  }
}
```

### Async State Pattern

```jsx
const useAsync = (asyncFn) => {
  const data = useRefraction(null)
  const loading = useRefraction(false)
  const error = useRefraction(null)
  
  const execute = async (...args) => {
    loading.set(true)
    error.set(null)
    try {
      const result = await asyncFn(...args)
      data.set(result)
      return result
    } catch (err) {
      error.set(err)
      throw err
    } finally {
      loading.set(false)
    }
  }
  
  return { data, loading, error, execute }
}
```

## 🚀 Performance Tips

1. **Use computed values** for derived state
2. **Batch updates** when modifying multiple states
3. **Debounce** rapid state changes
4. **Lazy initialize** expensive state
5. **Use selectors** to minimize re-renders

---

## Next Steps

Now that you understand state management in Refract:

- 📖 Learn about [Side Effects](/docs/side-effects)
- 🎯 Explore [Optical Composition](/docs/optical-composition)  
- 🔄 Master [Data Fetching](/docs/data-fetching)
- ⚡ Optimize with [Performance Guide](/docs/performance)

---

*State management doesn't have to be complex. With Refract's refractions, it's simple, predictable, and powerful.* ✨
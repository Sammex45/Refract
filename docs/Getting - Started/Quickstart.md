---
sidebar_position: 3
---

# Quick Start

Build your first Refract app in under 10 minutes! This hands-on guide will teach you the fundamentals by building a real application.

## What We'll Build

We'll create an interactive task manager app that demonstrates:

- Components and JSX
- Reactive state with refractions
- Event handling
- Lists and keys
- Conditional rendering
- Side effects
- Styling

![Task Manager Preview](https://refract-js.org/img/quickstart-preview.png)

## Step 1: Create Your App

Open your terminal and run:

```bash
npx create-refract-app quick-task-app
cd quick-task-app
npm start
```

Your app is now running at [http://localhost:3000](http://localhost:3000)

## Step 2: Your First Component

Replace the contents of `src/App.jsx` with:

```jsx
import { createComponent } from "refract-js";

const App = createComponent(({ lens }) => {
  return (
    <div className="app">
      <h1>My Task Manager</h1>
      <p>Let's build something awesome with Refract!</p>
    </div>
  );
});

export default App;
```

### What's happening here?

- `createComponent` creates a Refract component
- Components receive a `lens` object that provides access to state and props
- We return JSX that describes our UI
- The component automatically re-renders when state changes

Save the file and see your app update instantly!

## Step 3: Add Reactive State

Let's add state to track our tasks:

```jsx
import { createComponent } from "refract-js";

const App = createComponent(({ lens }) => {
  // Create reactive state with useRefraction
  const tasks = lens.useRefraction([
    { id: 1, text: "Learn Refract basics", done: false },
    { id: 2, text: "Build an awesome app", done: false },
    { id: 3, text: "Share with friends", done: false },
  ]);

  return (
    <div className="app">
      <h1>My Task Manager</h1>
      <div className="task-count">You have {tasks.value.length} tasks</div>

      {/* Display tasks */}
      <ul className="task-list">
        {tasks.value.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
});

export default App;
```

### Key Concepts:

- `lens.useRefraction()` creates reactive state
- Access the current value with `.value`
- The UI automatically updates when state changes
- Always use `key` prop when rendering lists

## Step 4: Add Styling

Create `src/App.css`:

```css
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

h1 {
  color: #4a5568;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}

.task-count {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.task-item:hover {
  border-color: #667eea;
  transform: translateX(4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-item.done {
  opacity: 0.6;
  background: #f7fafc;
}

.task-item.done .task-text {
  text-decoration: line-through;
  color: #718096;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  cursor: pointer;
}

.task-text {
  flex: 1;
  color: #2d3748;
}

.delete-btn {
  background: #fc8181;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #f56565;
}

.add-task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.task-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.task-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.filter-btn:hover:not(.active) {
  border-color: #cbd5e0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  color: #718096;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

Import the CSS in your `App.jsx`:

```jsx
import { createComponent } from "refract-js";
import "./App.css";

// ... rest of your component
```

## Step 5: Add Interactivity

Update your `App.jsx` to handle task interactions:

```jsx
import { createComponent } from "refract-js";
import "./App.css";

const App = createComponent(({ lens }) => {
  const tasks = lens.useRefraction([
    { id: 1, text: "Learn Refract basics", done: false },
    { id: 2, text: "Build an awesome app", done: false },
    { id: 3, text: "Share with friends", done: false },
  ]);

  const newTaskText = lens.useRefraction("");

  // Toggle task completion
  const toggleTask = (id) => {
    tasks.set(
      tasks.value.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    tasks.set(tasks.value.filter((task) => task.id !== id));
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.value.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.value,
        done: false,
      };
      tasks.set([...tasks.value, newTask]);
      newTaskText.set("");
    }
  };

  return (
    <div className="app">
      <h1>My Task Manager</h1>

      <div className="task-count">
        You have {tasks.value.filter((t) => !t.done).length} active tasks
      </div>

      {/* Add task form */}
      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={newTaskText.value}
          onChange={(e) => newTaskText.set(e.target.value)}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!newTaskText.value.trim()}
        >
          Add Task
        </button>
      </form>

      {/* Task list */}
      <ul className="task-list">
        {tasks.value.map((task) => (
          <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.value.length === 0 && (
        <p style={{ textAlign: "center", color: "#718096" }}>
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  );
});

export default App;
```

## Step 6: Add Filters

Let's add the ability to filter tasks:

```jsx
import { createComponent } from "refract-js";
import "./App.css";

const App = createComponent(({ lens }) => {
  const tasks = lens.useRefraction([
    { id: 1, text: "Learn Refract basics", done: false },
    { id: 2, text: "Build an awesome app", done: false },
    { id: 3, text: "Share with friends", done: false },
  ]);

  const newTaskText = lens.useRefraction("");
  const filter = lens.useRefraction("all"); // 'all', 'active', 'completed'

  const toggleTask = (id) => {
    tasks.set(
      tasks.value.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    tasks.set(tasks.value.filter((task) => task.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.value.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.value,
        done: false,
      };
      tasks.set([...tasks.value, newTask]);
      newTaskText.set("");
    }
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.value.filter((task) => {
    if (filter.value === "active") return !task.done;
    if (filter.value === "completed") return task.done;
    return true;
  });

  // Calculate statistics
  const stats = {
    total: tasks.value.length,
    active: tasks.value.filter((t) => !t.done).length,
    completed: tasks.value.filter((t) => t.done).length,
  };

  return (
    <div className="app">
      <h1>My Task Manager</h1>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Add task form */}
      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={newTaskText.value}
          onChange={(e) => newTaskText.set(e.target.value)}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!newTaskText.value.trim()}
        >
          Add Task
        </button>
      </form>

      {/* Filter buttons */}
      <div className="filters">
        <button
          className={`filter-btn ${filter.value === "all" ? "active" : ""}`}
          onClick={() => filter.set("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter.value === "active" ? "active" : ""}`}
          onClick={() => filter.set("active")}
        >
          Active
        </button>
        <button
          className={`filter-btn ${
            filter.value === "completed" ? "active" : ""
          }`}
          onClick={() => filter.set("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task list */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p style={{ textAlign: "center", color: "#718096" }}>
          {filter.value === "completed"
            ? "No completed tasks yet!"
            : filter.value === "active"
            ? "No active tasks. Great job!"
            : "No tasks yet. Add one above!"}
        </p>
      )}
    </div>
  );
});

export default App;
```

## Step 7: Add Local Storage

Let's persist tasks in localStorage using effects:

```jsx
import { createComponent } from "refract-js";
import "./App.css";

const App = createComponent(({ lens }) => {
  // Load tasks from localStorage or use defaults
  const loadTasks = () => {
    const saved = localStorage.getItem("refract-tasks");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, text: "Learn Refract basics", done: false },
      { id: 2, text: "Build an awesome app", done: false },
      { id: 3, text: "Share with friends", done: false },
    ];
  };

  const tasks = lens.useRefraction(loadTasks());
  const newTaskText = lens.useRefraction("");
  const filter = lens.useRefraction("all");

  // Save tasks to localStorage whenever they change
  lens.useEffect(() => {
    localStorage.setItem("refract-tasks", JSON.stringify(tasks.value));
  }, [tasks.value]);

  // Show a welcome message on first load
  lens.useEffect(() => {
    console.log("Welcome to Refract Task Manager!");

    // Cleanup function (optional)
    return () => {
      console.log("Goodbye!");
    };
  }, []); // Empty dependency array = run once on mount

  const toggleTask = (id) => {
    tasks.set(
      tasks.value.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    tasks.set(tasks.value.filter((task) => task.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.value.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.value,
        done: false,
      };
      tasks.set([...tasks.value, newTask]);
      newTaskText.set("");
    }
  };

  const clearCompleted = () => {
    tasks.set(tasks.value.filter((task) => !task.done));
  };

  const filteredTasks = tasks.value.filter((task) => {
    if (filter.value === "active") return !task.done;
    if (filter.value === "completed") return task.done;
    return true;
  });

  const stats = {
    total: tasks.value.length,
    active: tasks.value.filter((t) => !t.done).length,
    completed: tasks.value.filter((t) => t.done).length,
  };

  return (
    <div className="app">
      <h1>My Task Manager</h1>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={newTaskText.value}
          onChange={(e) => newTaskText.set(e.target.value)}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!newTaskText.value.trim()}
        >
          Add Task
        </button>
      </form>

      <div className="filters">
        <button
          className={`filter-btn ${filter.value === "all" ? "active" : ""}`}
          onClick={() => filter.set("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={`filter-btn ${filter.value === "active" ? "active" : ""}`}
          onClick={() => filter.set("active")}
        >
          Active ({stats.active})
        </button>
        <button
          className={`filter-btn ${
            filter.value === "completed" ? "active" : ""
          }`}
          onClick={() => filter.set("completed")}
        >
          Completed ({stats.completed})
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p style={{ textAlign: "center", color: "#718096" }}>
          {filter.value === "completed"
            ? "No completed tasks yet!"
            : filter.value === "active"
            ? "No active tasks. Great job!"
            : "No tasks yet. Add one above!"}
        </p>
      )}

      {stats.completed > 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            className="delete-btn"
            onClick={clearCompleted}
            style={{ padding: "0.5rem 1rem" }}
          >
            Clear {stats.completed} completed task
            {stats.completed !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
});

export default App;
```

## Congratulations!

You've just built a fully functional task manager with Refract! Let's review what you learned:

### Core Concepts Mastered

1. **Components** - Created reusable UI components with `createComponent`
2. **Refractions** - Used reactive state that automatically updates the UI
3. **Lens** - Accessed state, props, and effects through the lens interface
4. **Event Handling** - Handled user interactions with onClick, onChange, onSubmit
5. **Lists & Keys** - Rendered dynamic lists with proper keys
6. **Conditional Rendering** - Showed different UI based on state
7. **Effects** - Used side effects for localStorage persistence
8. **Styling** - Applied CSS for a polished look

## Next Steps

### Enhance Your App

Try adding these features to practice more:

```jsx
// 1. Add task priorities
const priority = lens.useRefraction('normal') // 'low', 'normal', 'high'

// 2. Add due dates
const dueDate = lens.useRefraction(new Date())

// 3. Add task categories
const category = lens.useRefraction('personal') // 'work', 'personal', 'shopping'

// 4. Add search functionality
const searchTerm = lens.useRefraction('')
const searchedTasks = filteredTasks.filter(task =>
  task.text.toLowerCase().includes(searchTerm.value.toLowerCase())
)

// 5. Add animations
<div animate={{
  opacity: [0, 1],
  x: [-20, 0],
  transition: { duration: 0.3 }
}}>
  {/* Animated content */}
</div>
```

### Explore More Features

#### 1. Extract Components

Create reusable components:

```jsx
const TaskItem = createComponent(({ lens }) => {
  const { task, onToggle, onDelete } = lens.props;

  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
});
```

#### 2. Create Custom Optics (Hooks)

```jsx
// Create a reusable task manager optic
function useTaskManager(initialTasks = []) {
  const tasks = useRefraction(initialTasks);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, done: false };
    tasks.set([...tasks.value, newTask]);
  };

  const toggleTask = (id) => {
    tasks.set(
      tasks.value.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    tasks.set(tasks.value.filter((t) => t.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
```

#### 3. Add Routing

```jsx
import { Router, Route, Link } from "@refract/router";

const App = createComponent(() => {
  return (
    <Router>
      <nav>
        <Link to="/">Tasks</Link>
        <Link to="/stats">Statistics</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Route path="/" component={TaskList} />
      <Route path="/stats" component={Statistics} />
      <Route path="/settings" component={Settings} />
    </Router>
  );
});
```

## Learn More

Ready to dive deeper? Check out these resources:

- **[Core Concepts](/docs/concepts)** - Understand refractions, lenses, and optical composition
- **[API Reference](/api)** - Complete API documentation
- **[Examples](/examples)** - More sample projects
- **[Tutorial Series](/tutorials)** - Step-by-step guides
- **[Community Discord](https://discord.gg/refract)** - Get help and share your projects

## Share Your Creation

Built something cool? We'd love to see it!

1. Share on Twitter with [#RefractJS](https://twitter.com/hashtag/RefractJS)
2. Show it off in our [Discord showcase](https://discord.gg/refract)
3. Submit it to our [examples repository](https://github.com/refract-js/examples)

## Quick Reference

Here's a handy reference for what you learned:

```jsx
// Create a component
const MyComponent = createComponent(({ lens }) => {
  // Create reactive state
  const state = lens.useRefraction(initialValue);

  // Read state value
  console.log(state.value);

  // Update state
  state.set(newValue);

  // Use effects
  lens.useEffect(() => {
    // Side effect code
    return () => {
      // Cleanup (optional)
    };
  }, [dependencies]);

  // Access props
  const { propName } = lens.props;

  // Return JSX
  return <div>Hello Refract!</div>;
});

// Common patterns
const toggle = () => state.set(!state.value);
const increment = () => count.set(count.value + 1);
const addItem = (item) => list.set([...list.value, item]);
const removeItem = (id) => list.set(list.value.filter((i) => i.id !== id));
const updateItem = (id, updates) =>
  list.set(list.value.map((i) => (i.id === id ? { ...i, ...updates } : i)));
```

---

**You did it!** You're now ready to build amazing reactive applications with Refract. The journey has just begun - explore, experiment, and enjoy building with Refract!

_Questions? Need help? Join our [Discord community](https://discord.gg/refract) - we're here to help!_

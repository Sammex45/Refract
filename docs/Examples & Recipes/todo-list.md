---
id: todo-list
title: Todo List
sidebar_label: Todo List
sidebar_position: 2
---

# Todo List

A classic example showing lists, controlled inputs, and effects.

## What You'll Learn
- Managing arrays with refractions
- Side effects with `lens.useEffect`
- Simple input handling

## Example
```jsx
import { createComponent } from 'refract';

const TodoList = createComponent(({ lens }) => {
  const todos = lens.useRefraction([]);
  const input = lens.useRefraction("");

  function addTodo() {
    if (input.value.trim() === "") return;
    todos.set([...todos.value, { id: Date.now(), text: input.value }]);
    input.set("");
  }

  lens.useEffect(() => {
    // Example: hydrate from storage
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.set(saved);
  }, []);

  lens.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }, [todos.value]);

  return (
    <div>
      <input
        value={input.value}
        onInput={(e) => input.set(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.value.map(t => <li key={t.id}>{t.text}</li>)}
      </ul>
    </div>
  );
});

export default TodoList;
```

## Tips
- Treat arrays immutably (copy then set).
- Use effects to persist state.


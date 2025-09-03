---
sidebar_position: 2
---


# Event Handling

Events are the bridge between user interactions and your application's logic. Refract provides a powerful, intuitive event handling system that feels familiar yet offers advanced capabilities for building interactive applications.

## 🎯 Core Concepts

### What are Events?

Events represent user interactions and system changes:
- **User Events**: clicks, typing, scrolling, hovering
- **Form Events**: submit, change, focus, blur
- **Keyboard Events**: keydown, keyup, keypress
- **Mouse Events**: click, mouseover, drag
- **Touch Events**: tap, swipe, pinch
- **Custom Events**: application-specific events

### The Refract Approach

Refract's event handling is built on three principles:

1. **Simplicity**: Attach handlers directly in JSX
2. **Performance**: Automatic event delegation and optimization
3. **Flexibility**: Support for all native and custom events

```jsx
// Event handling in Refract is clean and intuitive
const Button = createComponent(({ lens }) => {
  const handleClick = (e) => {
    console.log('Clicked!', e)
  }
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  )
})
```

## 🖱️ Basic Event Handling

### Attaching Event Handlers

Add event handlers using camelCase props:

```jsx
const EventExamples = createComponent(({ lens }) => {
  const count = lens.useRefraction(0)
  const text = lens.useRefraction('')
  const hovered = lens.useRefraction(false)
  
  return (
    <div>
      {/* Click events */}
      <button onClick={() => count.set(count.value + 1)}>
        Clicked {count.value} times
      </button>
      
      {/* Input events */}
      <input 
        onChange={(e) => text.set(e.target.value)}
        value={text.value}
        placeholder="Type something..."
      />
      
      {/* Mouse events */}
      <div
        onMouseEnter={() => hovered.set(true)}
        onMouseLeave={() => hovered.set(false)}
        style={{ 
          background: hovered.value ? '#667eea' : '#e2e8f0',
          padding: '20px',
          transition: 'background 0.3s'
        }}
      >
        {hovered.value ? 'Hovering!' : 'Hover over me'}
      </div>
      
      {/* Focus events */}
      <input
        onFocus={(e) => console.log('Focused:', e.target)}
        onBlur={(e) => console.log('Blurred:', e.target)}
        placeholder="Focus me"
      />
    </div>
  )
})
```

### The Event Object

Refract provides a synthetic event object with consistent properties:

```jsx
const EventInfo = createComponent(({ lens }) => {
  const eventData = lens.useRefraction({})
  
  const handleEvent = (e) => {
    eventData.set({
      type: e.type,                    // Event type
      target: e.target.tagName,        // Target element
      currentTarget: e.currentTarget.tagName, // Handler element
      timestamp: e.timeStamp,          // When it occurred
      isTrusted: e.isTrusted,          // User-initiated?
      defaultPrevented: e.defaultPrevented,
      bubbles: e.bubbles,
      // Mouse-specific
      clientX: e.clientX,
      clientY: e.clientY,
      screenX: e.screenX,
      screenY: e.screenY,
      // Keyboard-specific
      key: e.key,
      keyCode: e.keyCode,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey
    })
  }
  
  return (
    <div>
      <button onClick={handleEvent}>Click for event info</button>
      <input onKeyDown={handleEvent} placeholder="Type for key info" />
      <div onMouseMove={handleEvent} style={{ 
        height: '100px', 
        background: '#f7fafc',
        padding: '10px'
      }}>
        Move mouse here
      </div>
      
      <pre style={{ background: '#1a202c', color: '#68d391', padding: '10px' }}>
        {JSON.stringify(eventData.value, null, 2)}
      </pre>
    </div>
  )
})
```

### Preventing Default Behavior

Control browser default actions:

```jsx
const FormExample = createComponent(({ lens }) => {
  const submitted = lens.useRefraction(false)
  
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page reload
    console.log('Form submitted!')
    submitted.set(true)
  }
  
  const handleRightClick = (e) => {
    e.preventDefault() // Prevent context menu
    console.log('Right clicked!')
  }
  
  const handleDragStart = (e) => {
    e.preventDefault() // Prevent dragging
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter text" />
        <button type="submit">Submit</button>
        {submitted.value && <p>✅ Form submitted!</p>}
      </form>
      
      <div onContextMenu={handleRightClick}>
        Right-click me (context menu disabled)
      </div>
      
      <img 
        src="/logo.png" 
        onDragStart={handleDragStart}
        alt="Not draggable"
      />
    </div>
  )
})
```

### Stopping Event Propagation

Control event bubbling:

```jsx
const PropagationExample = createComponent(({ lens }) => {
  const clicks = lens.useRefraction({ outer: 0, inner: 0 })
  
  const handleOuterClick = () => {
    clicks.set({ ...clicks.value, outer: clicks.value.outer + 1 })
  }
  
  const handleInnerClick = (e) => {
    e.stopPropagation() // Stop bubbling to parent
    clicks.set({ ...clicks.value, inner: clicks.value.inner + 1 })
  }
  
  return (
    <div 
      onClick={handleOuterClick}
      style={{ 
        padding: '40px', 
        background: '#e2e8f0',
        cursor: 'pointer'
      }}
    >
      Outer (clicked {clicks.value.outer} times)
      
      <div 
        onClick={handleInnerClick}
        style={{ 
          padding: '20px', 
          background: '#667eea',
          color: 'white',
          marginTop: '20px'
        }}
      >
        Inner (clicked {clicks.value.inner} times)
        <br />
        <small>Click doesn't bubble to outer</small>
      </div>
    </div>
  )
})
```

## ⌨️ Keyboard Events

### Handling Keyboard Input

Work with keyboard events effectively:

```jsx
const KeyboardHandler = createComponent(({ lens }) => {
  const pressedKeys = lens.useRefraction(new Set())
  const lastKey = lens.useRefraction('')
  const shortcuts = lens.useRefraction([])
  
  const handleKeyDown = (e) => {
    // Track pressed keys
    const newKeys = new Set(pressedKeys.value)
    newKeys.add(e.key)
    pressedKeys.set(newKeys)
    lastKey.set(e.key)
    
    // Check for shortcuts
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      shortcuts.set([...shortcuts.value, 'Save'])
    }
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault()
      shortcuts.set([...shortcuts.value, 'Undo'])
    }
    if (e.altKey && e.key === 'Enter') {
      e.preventDefault()
      shortcuts.set([...shortcuts.value, 'Submit'])
    }
  }
  
  const handleKeyUp = (e) => {
    const newKeys = new Set(pressedKeys.value)
    newKeys.delete(e.key)
    pressedKeys.set(newKeys)
  }
  
  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Press keys or use shortcuts (Ctrl+S, Ctrl+Z, Alt+Enter)"
        style={{ width: '100%', padding: '10px' }}
      />
      
      <div style={{ marginTop: '20px' }}>
        <p>Last key: <strong>{lastKey.value}</strong></p>
        <p>Currently pressed: {Array.from(pressedKeys.value).join(', ')}</p>
        <p>Shortcuts triggered: {shortcuts.value.join(', ')}</p>
      </div>
    </div>
  )
})
```

### Global Keyboard Shortcuts

Implement app-wide keyboard shortcuts:

```jsx
const useGlobalShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = `${e.ctrlKey ? 'ctrl+' : ''}${e.altKey ? 'alt+' : ''}${e.shiftKey ? 'shift+' : ''}${e.key.toLowerCase()}`
      
      if (shortcuts[key]) {
        e.preventDefault()
        shortcuts[key](e)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

const App = createComponent(({ lens }) => {
  const modal = lens.useRefraction(false)
  const search = lens.useRefraction(false)
  
  useGlobalShortcuts({
    'ctrl+k': () => search.set(true),
    'ctrl+/': () => modal.set(true),
    'escape': () => {
      modal.set(false)
      search.set(false)
    }
  })
  
  return (
    <div>
      <p>Press Ctrl+K for search, Ctrl+/ for help, Escape to close</p>
      
      {search.value && (
        <div style={{ 
          position: 'fixed', 
          top: '20%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'white',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Search</h3>
          <input autoFocus placeholder="Search..." />
        </div>
      )}
      
      {modal.value && (
        <div style={{ 
          position: 'fixed', 
          top: '30%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'white',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Keyboard Shortcuts</h3>
          <p>Ctrl+K - Search</p>
          <p>Ctrl+/ - This help</p>
          <p>Escape - Close dialogs</p>
        </div>
      )}
    </div>
  )
})
```

## 🖱️ Mouse Events

### Tracking Mouse Position

Create interactive mouse-following effects:

```jsx
const MouseTracker = createComponent(({ lens }) => {
  const position = lens.useRefraction({ x: 0, y: 0 })
  const isInside = lens.useRefraction(false)
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    position.set({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }
  
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isInside.set(true)}
      onMouseLeave={() => isInside.set(false)}
      style={{ 
        position: 'relative',
        height: '300px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden'
      }}
    >
      {isInside.value && (
        <div
          style={{
            position: 'absolute',
            left: position.value.x - 25,
            top: position.value.y - 25,
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '50%',
            pointerEvents: 'none',
            transition: 'transform 0.1s',
            transform: 'scale(1.2)'
          }}
        />
      )}
      <p style={{ color: 'white', padding: '20px' }}>
        Move your mouse around
      </p>
    </div>
  )
})
```

### Drag and Drop

Implement drag and drop functionality:

```jsx
const DragDropList = createComponent(({ lens }) => {
  const items = lens.useRefraction([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
    { id: 4, text: 'Task 4' }
  ])
  
  const draggedItem = lens.useRefraction(null)
  const draggedOver = lens.useRefraction(null)
  
  const handleDragStart = (e, item) => {
    draggedItem.set(item)
    e.dataTransfer.effectAllowed = 'move'
  }
  
  const handleDragOver = (e, item) => {
    e.preventDefault()
    draggedOver.set(item.id)
    e.dataTransfer.dropEffect = 'move'
  }
  
  const handleDragLeave = () => {
    draggedOver.set(null)
  }
  
  const handleDrop = (e, targetItem) => {
    e.preventDefault()
    
    if (!draggedItem.value) return
    
    const draggedIdx = items.value.findIndex(i => i.id === draggedItem.value.id)
    const targetIdx = items.value.findIndex(i => i.id === targetItem.id)
    
    if (draggedIdx !== targetIdx) {
      const newItems = [...items.value]
      const [removed] = newItems.splice(draggedIdx, 1)
      newItems.splice(targetIdx, 0, removed)
      items.set(newItems)
    }
    
    draggedItem.set(null)
    draggedOver.set(null)
  }
  
  return (
    <div>
      <h3>Drag to reorder:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.value.map(item => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e, item)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item)}
            style={{
              padding: '15px',
              margin: '5px 0',
              background: draggedOver.value === item.id ? '#667eea' : '#e2e8f0',
              color: draggedOver.value === item.id ? 'white' : 'black',
              cursor: 'move',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
})
```

## 📱 Touch Events

### Handling Touch Interactions

Support mobile touch events:

```jsx
const TouchHandler = createComponent(({ lens }) => {
  const touches = lens.useRefraction([])
  const gesture = lens.useRefraction('')
  const swipeStart = lens.useRefraction(null)
  
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    swipeStart.set({ x: touch.clientX, y: touch.clientY })
    touches.set(Array.from(e.touches).map(t => ({
      x: t.clientX,
      y: t.clientY
    })))
  }
  
  const handleTouchMove = (e) => {
    touches.set(Array.from(e.touches).map(t => ({
      x: t.clientX,
      y: t.clientY
    })))
  }
  
  const handleTouchEnd = (e) => {
    if (swipeStart.value && e.changedTouches[0]) {
      const end = e.changedTouches[0]
      const deltaX = end.clientX - swipeStart.value.x
      const deltaY = end.clientY - swipeStart.value.y
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        gesture.set(deltaX > 0 ? 'Swipe Right' : 'Swipe Left')
      } else {
        gesture.set(deltaY > 0 ? 'Swipe Down' : 'Swipe Up')
      }
    }
    
    swipeStart.set(null)
    setTimeout(() => gesture.set(''), 2000)
  }
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        height: '300px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        userSelect: 'none'
      }}
    >
      <div>
        <p>{gesture.value || 'Touch and swipe!'}</p>
        <p style={{ fontSize: '14px' }}>
          Active touches: {touches.value.length}
        </p>
      </div>
    </div>
  )
})
```

### Gesture Recognition

Implement common touch gestures:

```jsx
const useGestures = (element) => {
  const pinchScale = useRefraction(1)
  const rotation = useRefraction(0)
  
  useEffect(() => {
    if (!element) return
    
    let initialDistance = 0
    let initialAngle = 0
    
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        const [t1, t2] = e.touches
        initialDistance = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY
        )
        initialAngle = Math.atan2(
          t2.clientY - t1.clientY,
          t2.clientX - t1.clientX
        )
      }
    }
    
    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const [t1, t2] = e.touches
        
        // Pinch zoom
        const distance = Math.hypot(
          t2.clientX - t1.clientX,
          t2.clientY - t1.clientY
        )
        if (initialDistance > 0) {
          pinchScale.set(distance / initialDistance)
        }
        
        // Rotation
        const angle = Math.atan2(
          t2.clientY - t1.clientY,
          t2.clientX - t1.clientX
        )
        if (initialAngle !== 0) {
          rotation.set((angle - initialAngle) * 180 / Math.PI)
        }
      }
    }
    
    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
    }
  }, [element])
  
  return { pinchScale, rotation }
}
```

## 📋 Form Events

### Handling Form Inputs

Work with form controls effectively:

```jsx
const FormHandler = createComponent(({ lens }) => {
  const formData = lens.useRefraction({
    username: '',
    email: '',
    password: '',
    country: 'us',
    terms: false,
    newsletter: true
  })
  
  const errors = lens.useRefraction({})
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    formData.set({
      ...formData.value,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Clear error when user types
    if (errors.value[name]) {
      errors.set({ ...errors.value, [name]: null })
    }
  }
  
  const handleBlur = (e) => {
    const { name, value } = e.target
    
    // Validation on blur
    const newErrors = { ...errors.value }
    
    if (name === 'email' && !value.includes('@')) {
      newErrors.email = 'Invalid email address'
    }
    if (name === 'password' && value.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    errors.set(newErrors)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          value={formData.value.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
      </div>
      
      <div>
        <input
          name="email"
          type="email"
          value={formData.value.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          required
        />
        {errors.value.email && (
          <span style={{ color: 'red' }}>{errors.value.email}</span>
        )}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          value={formData.value.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
          required
        />
        {errors.value.password && (
          <span style={{ color: 'red' }}>{errors.value.password}</span>
        )}
      </div>
      
      <div>
        <select
          name="country"
          value={formData.value.country}
          onChange={handleChange}
        >
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </select>
      </div>
      
      <div>
        <label>
          <input
            name="terms"
            type="checkbox"
            checked={formData.value.terms}
            onChange={handleChange}
          />
          I agree to the terms
        </label>
      </div>
      
      <div>
        <label>
          <input
            name="newsletter"
            type="checkbox"
            checked={formData.value.newsletter}
            onChange={handleChange}
          />
          Subscribe to newsletter
        </label>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  )
})
```

### File Upload Events

Handle file uploads with drag and drop:

```jsx
const FileUploader = createComponent(({ lens }) => {
  const files = lens.useRefraction([])
  const isDragging = lens.useRefraction(false)
  const uploadProgress = lens.useRefraction({})
  
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    processFiles(selectedFiles)
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
    isDragging.set(true)
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    isDragging.set(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    isDragging.set(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }
  
  const processFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!validTypes.includes(file.type)) {
        console.error(`Invalid file type: ${file.type}`)
        return false
      }
      if (file.size > maxSize) {
        console.error(`File too large: ${file.name}`)
        return false
      }
      return true
    })
    
    files.set([...files.value, ...validFiles])
    
    // Simulate upload
    validFiles.forEach(file => {
      uploadFile(file)
    })
  }
  
  const uploadFile = async (file) => {
    const progress = { [file.name]: 0 }
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      uploadProgress.set({
        ...uploadProgress.value,
        [file.name]: i
      })
    }
  }
  
  const removeFile = (index) => {
    const newFiles = [...files.value]
    newFiles.splice(index, 1)
    files.set(newFiles)
  }
  
  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging.value ? '#667eea' : '#cbd5e0'}`,
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          background: isDragging.value ? '#f7fafc' : 'white',
          transition: 'all 0.3s'
        }}
      >
        <p>Drag and drop files here, or</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" style={{
          background: '#667eea',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'inline-block',
          marginTop: '10px'
        }}>
          Browse Files
        </label>
      </div>
      
      {files.value.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Files:</h3>
          {files.value.map((file, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              background: '#f7fafc',
              marginBottom: '5px',
              borderRadius: '4px'
            }}>
              <span style={{ flex: 1 }}>{file.name}</span>
              <span style={{ marginRight: '10px' }}>
                {(file.size / 1024).toFixed(2)} KB
              </span>
              {uploadProgress.value[file.name] !== undefined && (
                <div style={{
                  width: '100px',
                  height: '10px',
                  background: '#e2e8f0',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  marginRight: '10px'
                }}>
                  <div style={{
                    width: `${uploadProgress.value[file.name]}%`,
                    height: '100%',
                    background: '#667eea',
                    transition: 'width 0.3s'
                  }} />
                </div>
              )}
              <button onClick={() => removeFile(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
```

## 🎪 Custom Events

### Creating Custom Events

Define and dispatch custom events:

```jsx
const useCustomEvent = (eventName, handler) => {
  useEffect(() => {
    window.addEventListener(eventName, handler)
    return () => window.removeEventListener(eventName, handler)
  }, [eventName, handler])
}

const dispatchCustomEvent = (eventName, detail) => {
  const event = new CustomEvent(eventName, { detail })
  window.dispatchEvent(event)
}

const NotificationSystem = createComponent(({ lens }) => {
  const notifications = lens.useRefraction([])
  
  useCustomEvent('notify', (e) => {
    const notification = {
      id: Date.now(),
      ...e.detail
    }
    notifications.set([...notifications.value, notification])
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notifications.set(notifications.value.filter(n => n.id !== notification.id))
    }, 3000)
  })
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {notifications.value.map(notif => (
        <div
          key={notif.id}
          style={{
            background: notif.type === 'error' ? '#fc8181' : '#68d391',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '10px',
            animation: 'slideIn 0.3s'
          }}
        >
          {notif.message}
        </div>
      ))}
    </div>
  )
})

// Usage anywhere in the app
const SomeComponent = createComponent(() => {
  const notify = (message, type = 'success') => {
    dispatchCustomEvent('notify', { message, type })
  }
  
  return (
    <div>
      <button onClick={() => notify('Success!')}>
        Show Success
      </button>
      <button onClick={() => notify('Error!', 'error')}>
        Show Error
      </button>
    </div>
  )
})
```

### Event Bus Pattern

Create a global event system:

```jsx
class EventBus {
  constructor() {
    this.events = {}
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    
    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }
  
  once(event, callback) {
    const unsubscribe = this.on(event, (data) => {
      callback(data)
      unsubscribe()
    })
  }
}

// Create global event bus
const eventBus = new EventBus()

// Hook for using event bus
const useEventBus = (event, handler) => {
  useEffect(() => {
    return eventBus.on(event, handler)
  }, [event, handler])
}

// Components using event bus
const Publisher = createComponent(({ lens }) => {
  const count = lens.useRefraction(0)
  
  const handleClick = () => {
    count.set(count.value + 1)
    eventBus.emit('count-updated', count.value + 1)
  }
  
  return (
    <button onClick={handleClick}>
      Publish Count: {count.value}
    </button>
  )
})

const Subscriber = createComponent(({ lens }) => {
  const receivedCount = lens.useRefraction(0)
  
  useEventBus('count-updated', (count) => {
    receivedCount.set(count)
  })
  
  return (
    <div>
      Received Count: {receivedCount.value}
    </div>
  )
})
```

## ⚡ Performance Optimization

### Event Delegation

Optimize event handling for large lists:

```jsx
const OptimizedList = createComponent(({ lens }) => {
  const items = lens.useRefraction(
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: `Item ${i}`,
      selected: false
    }))
  )
  
  // Single handler for all items (delegation)
  const handleListClick = (e) => {
    const itemElement = e.target.closest('[data-item-id]')
    if (!itemElement) return
    
    const itemId = parseInt(itemElement.dataset.itemId)
    const action = e.target.dataset.action
    
    if (action === 'select') {
      items.set(items.value.map(item =>
        item.id === itemId
          ? { ...item, selected: !item.selected }
          : item
      ))
    } else if (action === 'delete') {
      items.set(items.value.filter(item => item.id !== itemId))
    }
  }
  
  return (
    <ul onClick={handleListClick} style={{ listStyle: 'none', padding: 0 }}>
      {items.value.map(item => (
        <li
          key={item.id}
          data-item-id={item.id}
          style={{
            padding: '10px',
            background: item.selected ? '#667eea' : '#f7fafc',
            color: item.selected ? 'white' : 'black',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span data-action="select" style={{ cursor: 'pointer', flex: 1 }}>
            {item.text}
          </span>
          <button data-action="delete">Delete</button>
        </li>
      ))}
    </ul>
  )
})
```

### Debouncing Events

Optimize frequent events:

```jsx
const useDebounce = (value, delay) => {
  const debounced = useRefraction(value)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      debounced.set(value)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [value, delay])
  
  return debounced
}

const SearchBox = createComponent(({ lens }) => {
  const search = lens.useRefraction('')
  const debouncedSearch = useDebounce(search.value, 300)
  const results = lens.useRefraction([])
  const searching = lens.useRefraction(false)
  
  // Search when debounced value changes
  lens.useEffect(() => {
    if (debouncedSearch.value) {
      searching.set(true)
      // Simulate API call
      setTimeout(() => {
        results.set([
          `Result for "${debouncedSearch.value}" 1`,
          `Result for "${debouncedSearch.value}" 2`,
          `Result for "${debouncedSearch.value}" 3`
        ])
        searching.set(false)
      }, 500)
    } else {
      results.set([])
    }
  }, [debouncedSearch.value])
  
  return (
    <div>
      <input
        type="search"
        value={search.value}
        onChange={(e) => search.set(e.target.value)}
        placeholder="Type to search (debounced)..."
        style={{ width: '100%', padding: '10px' }}
      />
      
      {searching.value && <p>Searching...</p>}
      
      {results.value.length > 0 && (
        <ul>
          {results.value.map((result, i) => (
            <li key={i}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  )
})
```

### Throttling Events

Limit event frequency:

```jsx
const useThrottle = (callback, delay) => {
  const lastCall = useRefraction(0)
  
  return (...args) => {
    const now = Date.now()
    if (now - lastCall.value >= delay) {
      lastCall.set(now)
      callback(...args)
    }
  }
}

const ScrollTracker = createComponent(({ lens }) => {
  const scrollPosition = lens.useRefraction(0)
  const scrollCount = lens.useRefraction(0)
  
  const handleScroll = useThrottle((e) => {
    scrollPosition.set(e.target.scrollTop)
    scrollCount.set(scrollCount.value + 1)
  }, 100)
  
  return (
    <div>
      <div
        onScroll={handleScroll}
        style={{
          height: '200px',
          overflow: 'auto',
          border: '1px solid #cbd5e0',
          padding: '10px'
        }}
      >
        <div style={{ height: '1000px' }}>
          <p>Scroll me! (throttled to 100ms)</p>
          <p>Scroll position: {scrollPosition.value}px</p>
          <p>Scroll events fired: {scrollCount.value}</p>
        </div>
      </div>
    </div>
  )
})
```

## 📚 Best Practices

### 1. Use Event Delegation for Lists
```jsx
// ❌ Bad - handler for each item
{items.map(item => (
  <button onClick={() => handleClick(item.id)}>
    {item.text}
  </button>
))}

// ✅ Good - single delegated handler
<div onClick={handleClick}>
  {items.map(item => (
    <button data-id={item.id}>
      {item.text}
    </button>
  ))}
</div>
```

### 2. Clean Up Event Listeners
```jsx
// ✅ Always clean up global listeners
useEffect(() => {
  const handler = (e) => { /* ... */ }
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

### 3. Prevent Default When Needed
```jsx
// ✅ Prevent form submission page reload
<form onSubmit={(e) => {
  e.preventDefault()
  handleSubmit()
}}>
```

### 4. Use Proper Event Types
```jsx
// ❌ Bad - using click for keyboard accessibility
<div onClick={handleSelect}>Select</div>

// ✅ Good - proper semantic element
<button onClick={handleSelect}>Select</button>
```

### 5. Debounce/Throttle Expensive Operations
```jsx
// ✅ Debounce search input
const debouncedSearch = useDebounce(searchTerm, 300)

// ✅ Throttle scroll handler
const throttledScroll = useThrottle(handleScroll, 100)
```

## 🎯 Common Patterns

### Keyboard Navigation
```jsx
const useKeyboardNavigation = (items, onSelect) => {
  const selectedIndex = useRefraction(0)
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault()
          selectedIndex.set(Math.max(0, selectedIndex.value - 1))
          break
        case 'ArrowDown':
          e.preventDefault()
          selectedIndex.set(Math.min(items.length - 1, selectedIndex.value + 1))
          break
        case 'Enter':
          onSelect(items[selectedIndex.value])
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items, selectedIndex.value])
  
  return selectedIndex
}
```

### Click Outside Detection
```jsx
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }
    
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, handler])
}
```

---

## Next Steps

Master more Refract concepts:

- 🔄 [State Management](/docs/state-management)
- 🎨 [Animations](/docs/animations)
- 📊 [Data Fetching](/docs/data-fetching)
- ⚡ [Performance](/docs/performance)

---

*Events bring your application to life. With Refract's intuitive event system, you can create rich, interactive experiences with ease.* ✨
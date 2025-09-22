---
sidebar_position: 3
---

# Animations

Bring your interfaces to life with Refract's built-in animation system. No external libraries needed - just declarative, performant animations that feel natural and responsive.

## Core Concepts

### Why Animations Matter

Animations aren't just visual flair - they're essential for:

- **User Feedback**: Confirming actions and state changes
- **Spatial Awareness**: Helping users understand where things come from and go
- **Perceived Performance**: Making apps feel faster and more responsive
- **Emotional Design**: Creating delightful, memorable experiences
- **Accessibility**: Providing visual cues for interactions

### The Refract Approach

Refract's animation system is built on three principles:

1. **Declarative**: Describe the end state, Refract handles the transition
2. **Performant**: GPU-accelerated, 60fps animations by default
3. **Intuitive**: Natural physics-based motion that feels right

```jsx
// Animation in Refract is this simple
const AnimatedBox = createComponent(({ lens }) => {
  const isOpen = lens.useRefraction(false);

  return (
    <div
      animate={{
        height: isOpen.value ? 200 : 50,
        opacity: isOpen.value ? 1 : 0.5,
      }}
      onClick={() => isOpen.set(!isOpen.value)}
    >
      Click to animate
    </div>
  );
});
```

## Basic Animations

### The Animate Prop

Use the `animate` prop to define target values:

```jsx
const SimpleAnimation = createComponent(({ lens }) => {
  const expanded = lens.useRefraction(false);
  const hovered = lens.useRefraction(false);

  return (
    <div>
      {/* Single property animation */}
      <div
        animate={{
          width: expanded.value ? 300 : 150,
        }}
        onClick={() => expanded.set(!expanded.value)}
        style={{
          height: "50px",
          background: "#667eea",
          color: "white",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Click to {expanded.value ? "collapse" : "expand"}
      </div>

      {/* Multiple properties */}
      <div
        animate={{
          scale: hovered.value ? 1.1 : 1,
          rotate: hovered.value ? 5 : 0,
          backgroundColor: hovered.value ? "#764ba2" : "#667eea",
        }}
        onMouseEnter={() => hovered.set(true)}
        onMouseLeave={() => hovered.set(false)}
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Hover me!
      </div>
    </div>
  );
});
```

### Transition Configuration

Control how animations behave:

```jsx
const TransitionTypes = createComponent(({ lens }) => {
  const active = lens.useRefraction(0);

  const examples = [
    {
      name: "Spring (default)",
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    {
      name: "Tween",
      transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
    },
    {
      name: "Inertia",
      transition: { type: "inertia", velocity: 50 },
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => active.set(i)}
            style={{
              padding: "10px 20px",
              background: active.value === i ? "#667eea" : "#e2e8f0",
              color: active.value === i ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div
        animate={{
          x: active.value * 150,
          rotate: active.value * 90,
          transition: examples[active.value].transition,
        }}
        style={{
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "8px",
        }}
      />
    </div>
  );
});
```

### Initial Animations

Animate elements on mount:

```jsx
const EntranceAnimation = createComponent(({ lens }) => {
  const items = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {items.map((item, i) => (
        <div
          key={item}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: i * 0.1,
              type: "spring",
              stiffness: 200,
            },
          }}
          style={{
            width: "80px",
            height: "80px",
            background: `hsl(${i * 60}, 70%, 60%)`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
});
```

## Spring Animations

### Physics-Based Motion

Spring animations create natural, fluid motion:

```jsx
const SpringPhysics = createComponent(({ lens }) => {
  const position = lens.useRefraction({ x: 0, y: 0 });
  const configs = lens.useRefraction({
    stiffness: 100,
    damping: 10,
    mass: 1,
  });

  const presets = {
    gentle: { stiffness: 50, damping: 20, mass: 1 },
    wobbly: { stiffness: 180, damping: 12, mass: 1 },
    stiff: { stiffness: 400, damping: 40, mass: 1 },
    slow: { stiffness: 50, damping: 20, mass: 3 },
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h4>Spring Presets:</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          {Object.entries(presets).map(([name, config]) => (
            <button
              key={name}
              onClick={() => configs.set(config)}
              style={{
                padding: "8px 16px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Stiffness: {configs.value.stiffness}</label>
        <input
          type="range"
          min="1"
          max="500"
          value={configs.value.stiffness}
          onChange={(e) =>
            configs.set({
              ...configs.value,
              stiffness: Number(e.target.value),
            })
          }
          style={{ width: "100%" }}
        />

        <label>Damping: {configs.value.damping}</label>
        <input
          type="range"
          min="1"
          max="50"
          value={configs.value.damping}
          onChange={(e) =>
            configs.set({
              ...configs.value,
              damping: Number(e.target.value),
            })
          }
          style={{ width: "100%" }}
        />

        <label>Mass: {configs.value.mass}</label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={configs.value.mass}
          onChange={(e) =>
            configs.set({
              ...configs.value,
              mass: Number(e.target.value),
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <div
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          position.set({
            x: e.clientX - rect.left - 25,
            y: e.clientY - rect.top - 25,
          });
        }}
        style={{
          position: "relative",
          width: "400px",
          height: "300px",
          background: "#f7fafc",
          border: "2px solid #e2e8f0",
          cursor: "crosshair",
        }}
      >
        <div
          animate={{
            x: position.value.x,
            y: position.value.y,
            transition: {
              type: "spring",
              ...configs.value,
            },
          }}
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
          }}
        />
        <p style={{ padding: "10px", color: "#718096" }}>
          Click anywhere to move the ball
        </p>
      </div>
    </div>
  );
});
```

### Velocity and Overshoot

Control spring behavior precisely:

```jsx
const SpringVelocity = createComponent(({ lens }) => {
  const x = lens.useRefraction(0);

  const springConfigs = [
    {
      name: "No Overshoot",
      config: { stiffness: 100, damping: 100, velocity: 0 },
    },
    {
      name: "Gentle Bounce",
      config: { stiffness: 200, damping: 10, velocity: 100 },
    },
    {
      name: "Big Bounce",
      config: { stiffness: 300, damping: 5, velocity: 500 },
    },
    {
      name: "Multiple Bounces",
      config: { stiffness: 400, damping: 3, velocity: 1000 },
    },
  ];

  return (
    <div>
      {springConfigs.map((spring, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <button
            onClick={() => x.set(x.value === 0 ? 300 : 0)}
            style={{
              padding: "8px 16px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {spring.name}
          </button>

          <div
            style={{
              position: "relative",
              height: "50px",
              background: "#f7fafc",
              borderRadius: "25px",
            }}
          >
            <div
              animate={{
                x: x.value,
                transition: {
                  type: "spring",
                  ...spring.config,
                },
              }}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                background: `hsl(${i * 90}, 70%, 60%)`,
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});
```

## Keyframe Animations

### Sequential Animations

Create multi-step animations:

```jsx
const KeyframeAnimation = createComponent(({ lens }) => {
  const isAnimating = lens.useRefraction(false);

  return (
    <div>
      <button
        onClick={() => isAnimating.set(!isAnimating.value)}
        style={{
          padding: "10px 20px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {isAnimating.value ? "Reset" : "Start Animation"}
      </button>

      <div
        animate={{
          x: isAnimating.value ? [0, 100, 100, 0, 0] : 0,
          y: isAnimating.value ? [0, 0, 100, 100, 0] : 0,
          rotate: isAnimating.value ? [0, 90, 180, 270, 360] : 0,
          scale: isAnimating.value ? [1, 1.2, 1, 0.8, 1] : 1,
          borderRadius: isAnimating.value
            ? ["10%", "50%", "10%", "50%", "10%"]
            : "10%",
          transition: {
            duration: 2,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut",
            repeat: isAnimating.value ? Infinity : 0,
          },
        }}
        style={{
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />
    </div>
  );
});
```

### Complex Choreography

Orchestrate multiple elements:

```jsx
const Choreography = createComponent(({ lens }) => {
  const active = lens.useRefraction(false);

  const staggerChildren = {
    animate: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <div>
      <button
        onClick={() => active.set(!active.value)}
        style={{
          padding: "10px 20px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {active.value ? "Hide" : "Show"} Items
      </button>

      <div
        animate={active.value ? "animate" : "initial"}
        variants={staggerChildren}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            variants={childVariants}
            style={{
              width: "100px",
              height: "100px",
              background: `hsl(${i * 40}, 70%, 60%)`,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
});
```

## Gesture Animations

### Drag Animations

Create draggable elements with spring physics:

```jsx
const DraggableBox = createComponent(({ lens }) => {
  const position = lens.useRefraction({ x: 0, y: 0 });
  const isDragging = lens.useRefraction(false);
  const dragStart = lens.useRefraction({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDragging.set(true);
    dragStart.set({
      x: e.clientX - position.value.x,
      y: e.clientY - position.value.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging.value) {
      position.set({
        x: e.clientX - dragStart.value.x,
        y: e.clientY - dragStart.value.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.set(false);
    // Snap back animation
    position.set({ x: 0, y: 0 });
  };

  lens.useEffect(() => {
    if (isDragging.value) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging.value]);

  return (
    <div
      style={{
        height: "400px",
        background: "#f7fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        animate={{
          x: position.value.x,
          y: position.value.y,
          scale: isDragging.value ? 1.1 : 1,
          transition: {
            type: "spring",
            stiffness: isDragging.value ? 0 : 200,
            damping: isDragging.value ? 0 : 20,
          },
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: "-50px",
          marginTop: "-50px",
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          cursor: isDragging.value ? "grabbing" : "grab",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Drag me!
      </div>
    </div>
  );
});
```

### Swipe Gestures

Detect and animate swipe gestures:

```jsx
const SwipeCards = createComponent(({ lens }) => {
  const cards = lens.useRefraction([
    { id: 1, color: "#667eea", text: "Swipe me!" },
    { id: 2, color: "#f56565", text: "Keep going!" },
    { id: 3, color: "#48bb78", text: "Almost there!" },
    { id: 4, color: "#ed8936", text: "Last one!" },
  ]);

  const currentIndex = lens.useRefraction(0);
  const dragX = lens.useRefraction(0);
  const isDragging = lens.useRefraction(false);
  const dragStart = lens.useRefraction(0);

  const handleDragStart = (e) => {
    isDragging.set(true);
    dragStart.set(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging.value) return;
    const clientX = e.clientX || e.touches[0].clientX;
    dragX.set(clientX - dragStart.value);
  };

  const handleDragEnd = () => {
    isDragging.set(false);

    // Determine swipe direction
    if (Math.abs(dragX.value) > 100) {
      if (dragX.value > 0 && currentIndex.value > 0) {
        currentIndex.set(currentIndex.value - 1);
      } else if (
        dragX.value < 0 &&
        currentIndex.value < cards.value.length - 1
      ) {
        currentIndex.set(currentIndex.value + 1);
      }
    }

    dragX.set(0);
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{
        position: "relative",
        width: "300px",
        height: "400px",
        margin: "0 auto",
        perspective: "1000px",
      }}
    >
      {cards.value.map((card, i) => (
        <div
          key={card.id}
          animate={{
            x: i === currentIndex.value ? dragX.value : 0,
            rotateY: (i - currentIndex.value) * 30,
            z: (i - currentIndex.value) * -100,
            opacity: Math.abs(i - currentIndex.value) > 1 ? 0 : 1,
            scale: i === currentIndex.value ? 1 : 0.9,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: card.color,
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            userSelect: "none",
            cursor: isDragging.value ? "grabbing" : "grab",
          }}
        >
          {card.text}
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {cards.value.map((_, i) => (
          <div
            key={i}
            onClick={() => currentIndex.set(i)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: i === currentIndex.value ? "#667eea" : "#cbd5e0",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
});
```

## FLIP Animations

### Layout Animations

Smoothly animate layout changes:

```jsx
const LayoutAnimation = createComponent(({ lens }) => {
  const items = lens.useRefraction([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ]);

  const layout = lens.useRefraction("grid");

  const shuffle = () => {
    const shuffled = [...items.value].sort(() => Math.random() - 0.5);
    items.set(shuffled);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${items.value.length + 1}`,
    };
    items.set([...items.value, newItem]);
  };

  const removeItem = (id) => {
    items.set(items.value.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={shuffle}>Shuffle</button>
        <button onClick={addItem}>Add Item</button>
        <button
          onClick={() => layout.set(layout.value === "grid" ? "list" : "grid")}
        >
          Switch to {layout.value === "grid" ? "List" : "Grid"}
        </button>
      </div>

      <div
        style={{
          display: layout.value === "grid" ? "grid" : "flex",
          gridTemplateColumns:
            layout.value === "grid" ? "repeat(3, 1fr)" : "none",
          flexDirection: layout.value === "list" ? "column" : "row",
          gap: "10px",
        }}
      >
        {items.value.map((item) => (
          <div
            key={item.id}
            layout
            animate={{
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
              },
            }}
            style={{
              padding: "20px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => removeItem(item.id)}
          >
            {item.name}
            <span style={{ fontSize: "12px" }}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
});
```

### Shared Layout Animation

Animate between different layouts:

```jsx
const SharedLayoutAnimation = createComponent(({ lens }) => {
  const selectedId = lens.useRefraction(null);

  const items = [
    { id: "a", title: "Project A", color: "#667eea" },
    { id: "b", title: "Project B", color: "#f56565" },
    { id: "c", title: "Project C", color: "#48bb78" },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            layoutId={item.id}
            onClick={() => selectedId.set(item.id)}
            animate={{
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
              },
            }}
            style={{
              padding: "15px 30px",
              background: item.color,
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {item.title}
          </div>
        ))}
      </div>

      {selectedId.value && (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => selectedId.set(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            layoutId={selectedId.value}
            style={{
              width: "400px",
              height: "300px",
              background: items.find((i) => i.id === selectedId.value).color,
              borderRadius: "20px",
              padding: "30px",
              color: "white",
            }}
          >
            <h2>{items.find((i) => i.id === selectedId.value).title}</h2>
            <p>Click to close</p>
          </div>
        </div>
      )}
    </div>
  );
});
```

## Performance Optimization

### GPU Acceleration

Optimize animations for 60fps:

```jsx
const PerformantAnimation = createComponent(({ lens }) => {
  const count = lens.useRefraction(100);
  const animating = lens.useRefraction(false);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>Number of elements: {count.value}</label>
        <input
          type="range"
          min="10"
          max="500"
          value={count.value}
          onChange={(e) => count.set(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <button onClick={() => animating.set(!animating.value)}>
          {animating.value ? "Stop" : "Start"} Animation
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))",
          gap: "5px",
        }}
      >
        {Array.from({ length: count.value }).map((_, i) => (
          <div
            key={i}
            animate={{
              // Use transform properties for GPU acceleration
              transform: animating.value
                ? `translateY(${
                    Math.sin(Date.now() / 1000 + i) * 10
                  }px) scale(${1 + Math.sin(Date.now() / 1000 + i) * 0.1})`
                : "translateY(0px) scale(1)",
              // Avoid animating layout properties
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
            }}
            style={{
              width: "30px",
              height: "30px",
              background: `hsl(${(i * 360) / count.value}, 70%, 60%)`,
              borderRadius: "4px",
              willChange: "transform", // Hint to browser for optimization
            }}
          />
        ))}
      </div>
    </div>
  );
});
```

### Reduce Motion Support

Respect user preferences for reduced motion:

```jsx
const useReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  return prefersReducedMotion.matches;
};

const AccessibleAnimation = createComponent(({ lens }) => {
  const isOpen = lens.useRefraction(false);
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <button onClick={() => isOpen.set(!isOpen.value)}>Toggle Panel</button>

      <div
        animate={{
          height: isOpen.value ? "auto" : 0,
          opacity: isOpen.value ? 1 : 0,
          transition: reducedMotion
            ? { duration: 0 } // Instant for reduced motion
            : { type: "spring", stiffness: 200, damping: 20 },
        }}
        style={{
          overflow: "hidden",
          background: "#f7fafc",
          marginTop: "10px",
        }}
      >
        <div style={{ padding: "20px" }}>
          <h3>Accessible Content</h3>
          <p>This animation respects user preferences for reduced motion.</p>
        </div>
      </div>
    </div>
  );
});
```

## Animation Patterns

### Loading States

Create smooth loading animations:

```jsx
const LoadingAnimation = createComponent(({ lens }) => {
  const loading = lens.useRefraction(true);

  setTimeout(() => loading.set(false), 3000);

  return (
    <div>
      {loading.value ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  },
                }}
                style={{
                  width: "15px",
                  height: "15px",
                  background: "#667eea",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>
          <p style={{ marginTop: "20px", color: "#718096" }}>Loading...</p>
        </div>
      ) : (
        <div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 200 },
          }}
          style={{
            padding: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h2>Content Loaded!</h2>
          <p>Here's your content</p>
        </div>
      )}
    </div>
  );
});
```

### Micro-interactions

Small animations for better UX:

```jsx
const MicroInteractions = createComponent(({ lens }) => {
  const liked = lens.useRefraction(false);
  const copied = lens.useRefraction(false);
  const saved = lens.useRefraction(false);

  const handleCopy = () => {
    copied.set(true);
    navigator.clipboard.writeText("Copied text!");
    setTimeout(() => copied.set(false), 2000);
  };

  const handleSave = () => {
    saved.set(true);
    setTimeout(() => saved.set(false), 2000);
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {/* Like button */}
      <button
        onClick={() => liked.set(!liked.value)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "30px",
        }}
      >
        <div
          animate={{
            scale: liked.value ? [1, 1.3, 1] : 1,
            rotate: liked.value ? [0, -10, 10, 0] : 0,
            transition: { duration: 0.4 },
          }}
        >
          {/* Emoji removed */}
        </div>
      </button>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        style={{
          padding: "10px 20px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div
          animate={{
            scale: copied.value ? [1, 0.9, 1] : 1,
          }}
        >
          {copied.value ? "✓ Copied!" : "Copy"}
        </div>
      </button>
      {/* Save button */}
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          background: saved.value ? "#48bb78" : "#e2e8f0",
          color: saved.value ? "white" : "black",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
      >
        <div
          animate={{
            x: saved.value ? [0, -5, 5, 0] : 0,
            transition: { duration: 0.3 },
          }}
        >
          {saved.value ? "✓ Saved" : "Save"}
        </div>
      </button>
    </div>
  );
});
```

### Page Transitions

Smooth transitions between pages:

```jsx
const PageTransition = createComponent(({ lens }) => {
  const currentPage = lens.useRefraction("home");

  const pages = {
    home: { title: "Home", color: "#667eea" },
    about: { title: "About", color: "#f56565" },
    contact: { title: "Contact", color: "#48bb78" },
  };

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        {Object.keys(pages).map((page) => (
          <button
            key={page}
            onClick={() => currentPage.set(page)}
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              background:
                currentPage.value === page ? pages[page].color : "#e2e8f0",
              color: currentPage.value === page ? "white" : "black",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {pages[page].title}
          </button>
        ))}
      </nav>

      <div
        key={currentPage.value}
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
          },
        }}
        exit={{
          opacity: 0,
          x: -20,
          transition: { duration: 0.2 },
        }}
        style={{
          padding: "40px",
          background: pages[currentPage.value].color,
          borderRadius: "12px",
          color: "white",
          minHeight: "200px",
        }}
      >
        <h2>{pages[currentPage.value].title} Page</h2>
        <p>
          This is the {pages[currentPage.value].title.toLowerCase()} page
          content.
        </p>
      </div>
    </div>
  );
});
```

## Animation Hooks

### Custom Animation Hooks

Create reusable animation logic:

```jsx
const useAnimation = (config = {}) => {
  const value = useRefraction(config.initial || 0)
  const isAnimating = useRefraction(false)

  const animate = (to, transition = {}) => {
    isAnimating.set(true)
    value.set(to)

    const duration = transition.duration || 0.3
    setTimeout(() => isAnimating.set(false), duration * 1000)
  }

  const spring = (to, springConfig = {}) => {
    animate(to, {
      type: 'spring',
      ...springConfig
    })
  }

  const reset = () => {
    value.set(config.initial || 0)
  }

  return {
    value: value.value,
    isAnimating: isAnimating.value,
    animate,
    spring,
    reset
  }
}

// Usage
const Component = createComponent(({ lens })) => {
  const slideIn = useAnimation({ initial: -100 })
  const fadeIn = useAnimation({ initial: 0 })

  lens.useEffect(() => {}
    slideIn.spring(0, { stiffness: 200 })
    fadeIn.animate(1))
```

    fadeIn.animate(1))

```

```

---
id: animated-modal
title: Animated Modal
sidebar_label: Animated Modal
sidebar_position: 4
---

# Animated Modal

Uses `useFlash` for one-time after-render animation effects.

## What You'll Learn
- Conditional rendering
- `useFlash` for animation start
- Focus management

## Example
```jsx
import { createComponent } from 'refract';

const AnimatedModal = createComponent(({ lens }) => {
  const open = lens.useRefraction(false);
  const visible = lens.useRefraction(false);

  const openModal = () => {
    open.set(true);
    // allow render, then animate
    lens.useFlash(() => visible.set(true));
  };

  const closeModal = () => {
    // animate out, then unmount
    visible.set(false);
    setTimeout(() => open.set(false), 200);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {open.value && (
        <div className={`backdrop ${visible.value ? 'in' : 'out'}`} onClick={closeModal}>
          <div className={`modal ${visible.value ? 'in' : 'out'}`} onClick={(e) => e.stopPropagation()}>
            <h3>Refract Modal</h3>
            <p>Smooth entry/exit using `useFlash`.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
});

export default AnimatedModal;
```

## Tips
- Start animations after mount with `useFlash`.
- Separate "open" vs "visible" for clean enter/exit control.
```
/* Example CSS */
.backdrop { opacity: 0; transition: opacity .2s; }
.backdrop.in { opacity: 1; }
.modal { transform: translateY(8px); opacity: 0; transition: transform .2s, opacity .2s; }
.modal.in { transform: translateY(0); opacity: 1; }
```


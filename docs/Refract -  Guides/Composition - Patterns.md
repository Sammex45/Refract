---
sidebar_position: 5
---

# Composition Patterns

Master the art of building complex UIs from simple, reusable pieces. Refract's composition model enables powerful patterns that make your code more maintainable, testable, and elegant.

## Core Concepts

### What is Composition?

Composition is the pattern of building complex functionality by combining simpler, independent pieces:

- **Component Composition**: Combining UI components
- **Behavior Composition**: Mixing functionality
- **State Composition**: Combining state logic
- **Style Composition**: Merging styles
- **Type Composition**: Combining TypeScript types

### The Refract Philosophy

Refract embraces composition over inheritance:

1. **Small, Focused Components**: Each does one thing well
2. **Explicit Dependencies**: Clear data flow
3. **Reusable Patterns**: Write once, use everywhere
4. **Flexible Assembly**: Mix and match as needed

```jsx
// Composition in action - building complex UI from simple parts
const App = createComponent(({ lens }) => {
  return (
    <Layout>
      <Header>
        <Logo />
        <Navigation />
        <UserMenu />
      </Header>
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </Layout>
  );
});
```

## Basic Composition

### Component Composition

Build complex components from simpler ones:

```jsx
// Simple, focused components
const Button = createComponent(({ lens }) => {
  const {
    children,
    variant = "primary",
    size = "medium",
    ...props
  } = lens.props;

  const styles = {
    primary: { background: "#667eea", color: "white" },
    secondary: { background: "#e2e8f0", color: "#4a5568" },
    danger: { background: "#f56565", color: "white" },
  };

  const sizes = {
    small: { padding: "6px 12px", fontSize: "14px" },
    medium: { padding: "10px 20px", fontSize: "16px" },
    large: { padding: "14px 28px", fontSize: "18px" },
  };

  return (
    <button
      style={{
        ...styles[variant],
        ...sizes[size],
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s",
        ...props.style,
      }}
      {...props}
    >
      {children}
    </button>
  );
});

const IconButton = createComponent(({ lens }) => {
  const { icon, label, ...props } = lens.props;

  return (
    <Button {...props}>
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon}
        {label}
      </span>
    </Button>
  );
});

const ButtonGroup = createComponent(({ lens }) => {
  const { children, direction = "horizontal" } = lens.props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        gap: "10px",
      }}
    >
      {children}
    </div>
  );
});

// Composed usage
const Toolbar = createComponent(({ lens }) => {
  return (
    <ButtonGroup>
      <IconButton icon="" label="New" variant="primary" />
      <IconButton icon="" label="Save" variant="secondary" />
      <IconButton icon="" label="Delete" variant="danger" />
    </ButtonGroup>
  );
});
```

### Props Composition

Compose and forward props effectively:

```jsx
const Card = createComponent(({ lens }) => {
  const {
    header,
    footer,
    children,
    padding = "20px",
    ...containerProps
  } = lens.props;

  return (
    <div
      {...containerProps}
      style={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        ...containerProps.style,
      }}
    >
      {header && (
        <div
          style={{
            padding,
            borderBottom: "1px solid #e2e8f0",
            background: "#f7fafc",
          }}
        >
          {header}
        </div>
      )}

      <div style={{ padding }}>{children}</div>

      {footer && (
        <div
          style={{
            padding,
            borderTop: "1px solid #e2e8f0",
            background: "#f7fafc",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
});

// Using composed props
const ProfileCard = createComponent(({ lens }) => {
  const user = lens.props.user;

  return (
    <Card
      header={<h3>{user.name}</h3>}
      footer={
        <ButtonGroup>
          <Button size="small">Follow</Button>
          <Button size="small" variant="secondary">
            Message
          </Button>
        </ButtonGroup>
      }
      onClick={() => console.log("Card clicked")}
      className="profile-card"
    >
      <p>{user.bio}</p>
      <p>{user.location}</p>
    </Card>
  );
});
```

## Compound Components

### Building Compound Components

Create components that work together:

```jsx
// Compound component system
const Tabs = createComponent(({ lens }) => {
  const { children, defaultTab = 0 } = lens.props;
  const activeTab = lens.useRefraction(defaultTab);

  // Share state through context-like pattern
  const tabsContext = {
    activeTab: activeTab.value,
    setActiveTab: (index) => activeTab.set(index),
  };

  return (
    <div className="tabs-container">
      {children.map((child) =>
        // Pass context to children
        createComponent(() => child({ tabsContext }))
      )}
    </div>
  );
});

const TabList = createComponent(({ lens }) => {
  const { children, tabsContext } = lens.props;

  return (
    <div
      style={{
        display: "flex",
        borderBottom: "2px solid #e2e8f0",
        marginBottom: "20px",
      }}
    >
      {children.map((child, index) =>
        createComponent(() =>
          child({
            ...child.props,
            isActive: tabsContext.activeTab === index,
            onClick: () => tabsContext.setActiveTab(index),
          })
        )
      )}
    </div>
  );
});

const Tab = createComponent(({ lens }) => {
  const { children, isActive, onClick } = lens.props;

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        background: "none",
        border: "none",
        borderBottom: isActive ? "2px solid #667eea" : "none",
        color: isActive ? "#667eea" : "#718096",
        cursor: "pointer",
        fontWeight: isActive ? "bold" : "normal",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
});

const TabPanels = createComponent(({ lens }) => {
  const { children, tabsContext } = lens.props;

  return (
    <div>
      {children.map((child, index) =>
        tabsContext.activeTab === index ? child : null
      )}
    </div>
  );
});

const TabPanel = createComponent(({ lens }) => {
  const { children } = lens.props;

  return (
    <div
      animate={{
        opacity: [0, 1],
        x: [-20, 0],
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </div>
  );
});

// Usage of compound components
const MyTabs = createComponent(() => {
  return (
    <Tabs defaultTab={0}>
      <TabList>
        <Tab>Profile</Tab>
        <Tab>Settings</Tab>
        <Tab>Notifications</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <h3>Profile Content</h3>
          <p>Edit your profile information here.</p>
        </TabPanel>
        <TabPanel>
          <h3>Settings Content</h3>
          <p>Manage your account settings.</p>
        </TabPanel>
        <TabPanel>
          <h3>Notifications Content</h3>
          <p>Configure notification preferences.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
});
```

### Accordion Pattern

Another compound component example:

```jsx
const Accordion = createComponent(({ lens }) => {
  const { children, allowMultiple = false } = lens.props;
  const openItems = lens.useRefraction(new Set());

  const toggleItem = (id) => {
    const newSet = new Set(openItems.value);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      if (!allowMultiple) {
        newSet.clear();
      }
      newSet.add(id);
    }
    openItems.set(newSet);
  };

  const accordionContext = {
    openItems: openItems.value,
    toggleItem,
  };

  return (
    <div className="accordion">
      {children.map((child) =>
        createComponent(() => child({ accordionContext }))
      )}
    </div>
  );
});

const AccordionItem = createComponent(({ lens }) => {
  const { id, children, accordionContext } = lens.props;
  const isOpen = accordionContext.openItems.has(id);

  return (
    <div
      style={{
        marginBottom: "10px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {children.map((child) =>
        createComponent(() =>
          child({
            ...child.props,
            isOpen,
            toggle: () => accordionContext.toggleItem(id),
          })
        )
      )}
    </div>
  );
});

const AccordionHeader = createComponent(({ lens }) => {
  const { children, isOpen, toggle } = lens.props;

  return (
    <button
      onClick={toggle}
      style={{
        width: "100%",
        padding: "15px",
        background: isOpen ? "#f7fafc" : "white",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background 0.2s",
      }}
    >
      {children}
      <span
        animate={{
          rotate: isOpen ? 180 : 0,
          transition: { duration: 0.2 },
        }}
      >
        ▼
      </span>
    </button>
  );
});

const AccordionContent = createComponent(({ lens }) => {
  const { children, isOpen } = lens.props;

  return (
    <div
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        transition: {
          height: { duration: 0.3 },
          opacity: { duration: 0.2 },
        },
      }}
      style={{
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "15px" }}>{children}</div>
    </div>
  );
});
```

## Render Props Pattern

### Function as Children

Pass render functions for flexible composition:

```jsx
const DataFetcher = createComponent(({ lens }) => {
  const { url, children } = lens.props;
  const data = lens.useRefraction(null);
  const loading = lens.useRefraction(true);
  const error = lens.useRefraction(null);

  lens.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(data.set)
      .catch(error.set)
      .finally(() => loading.set(false));
  }, [url]);

  // Pass state to children function
  return children({
    data: data.value,
    loading: loading.value,
    error: error.value,
  });
});

// Usage with render prop
const UserProfile = createComponent(({ lens }) => {
  return (
    <DataFetcher url="/api/user">
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (
          <div>
            <h2>{data.name}</h2>
            <p>{data.email}</p>
          </div>
        );
      }}
    </DataFetcher>
  );
});
```

### Slot Pattern

Use render props for customizable slots:

```jsx
const Modal = createComponent(({ lens }) => {
  const {
    isOpen,
    onClose,
    renderHeader,
    renderContent,
    renderFooter,
    size = "medium",
  } = lens.props;

  if (!isOpen) return null;

  const sizes = {
    small: "400px",
    medium: "600px",
    large: "800px",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        animate={{
          opacity: [0, 1],
          scale: [0.9, 1],
          transition: { type: "spring", stiffness: 300 },
        }}
        style={{
          width: sizes[size],
          maxWidth: "90%",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {renderHeader && (
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            {renderHeader({ onClose })}
          </div>
        )}

        <div style={{ padding: "20px" }}>{renderContent()}</div>

        {renderFooter && (
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            {renderFooter({ onClose })}
          </div>
        )}
      </div>
    </div>
  );
});

// Using the modal with custom slots
const ConfirmModal = createComponent(({ lens }) => {
  const isOpen = lens.useRefraction(false);

  return (
    <div>
      <Button onClick={() => isOpen.set(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen.value}
        onClose={() => isOpen.set(false)}
        renderHeader={({ onClose }) => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Confirm Action</h3>
            <button onClick={onClose}>✕</button>
          </div>
        )}
        renderContent={() => (
          <p>Are you sure you want to perform this action?</p>
        )}
        renderFooter={({ onClose }) => (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                console.log("Confirmed!");
                onClose();
              }}
            >
              Confirm
            </Button>
          </>
        )}
      />
    </div>
  );
});
```

## Higher-Order Components (HOCs)

### Creating HOCs

Enhance components with additional functionality:

```jsx
// HOC for authentication
const withAuth = (Component) => {
  return createComponent(({ lens }) => {
    const user = globalUserState; // Assume global user state
    const loading = lens.useRefraction(true);

    lens.useEffect(() => {
      // Check authentication
      checkAuth().then(() => loading.set(false));
    }, []);

    if (loading.value) {
      return <div>Checking authentication...</div>;
    }

    if (!user.value) {
      return <div>Please login to access this content</div>;
    }

    return <Component {...lens.props} user={user.value} />;
  });
};

// HOC for data fetching
const withData = (url) => (Component) => {
  return createComponent(({ lens }) => {
    const data = lens.useRefraction(null);
    const loading = lens.useRefraction(true);
    const error = lens.useRefraction(null);

    lens.useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then(data.set)
        .catch(error.set)
        .finally(() => loading.set(false));
    }, []);

    if (loading.value) return <div>Loading...</div>;
    if (error.value) return <div>Error: {error.value.message}</div>;

    return <Component {...lens.props} data={data.value} />;
  });
};

// HOC for logging
const withLogging = (Component) => {
  return createComponent(({ lens }) => {
    lens.useEffect(() => {
      console.log(`Component mounted: ${Component.name}`);
      return () => console.log(`Component unmounted: ${Component.name}`);
    }, []);

    lens.useEffect(() => {
      console.log(`Props updated:`, lens.props);
    }, [lens.props]);

    return <Component {...lens.props} />;
  });
};

// Composing multiple HOCs
const enhance = compose(withAuth, withData("/api/dashboard"), withLogging);

const Dashboard = createComponent(({ lens }) => {
  const { user, data } = lens.props;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
});

const EnhancedDashboard = enhance(Dashboard);
```

### HOC for State Management

Add state management capabilities:

```jsx
const withState = (initialState) => (Component) => {
  return createComponent(({ lens }) => {
    const state = lens.useRefraction(initialState);

    const setState = (updates) => {
      if (typeof updates === "function") {
        state.set(updates(state.value));
      } else {
        state.set({ ...state.value, ...updates });
      }
    };

    return (
      <Component {...lens.props} state={state.value} setState={setState} />
    );
  });
};

// Usage
const Counter = withState({ count: 0 })(
  createComponent(({ lens }) => {
    const { state, setState } = lens.props;

    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => setState({ count: state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  })
);
```

## Provider Pattern

### Context-like Providers

Share data across component tree:

```jsx
// Create a provider system
const createProvider = (name, defaultValue) => {
  const context = globalRefraction(defaultValue);

  const Provider = createComponent(({ lens }) => {
    const { value, children } = lens.props;

    lens.useEffect(() => {
      context.set(value);
    }, [value]);

    return children;
  });

  const useContext = () => {
    return context.value;
  };

  return { Provider, useContext };
};

// Create theme provider
const { Provider: ThemeProvider, useContext: useTheme } = createProvider(
  "theme",
  {
    colors: {
      primary: "#667eea",
      secondary: "#764ba2",
      background: "#ffffff",
      text: "#1a202c",
    },
    spacing: {
      small: "8px",
      medium: "16px",
      large: "24px",
    },
  }
);

// Create auth provider
const { Provider: AuthProvider, useContext: useAuth } = createProvider("auth", {
  user: null,
  isAuthenticated: false,
});

// Using providers
const App = createComponent(() => {
  const theme = {
    colors: { primary: "#48bb78" },
    spacing: { small: "4px", medium: "12px", large: "20px" },
  };

  const auth = {
    user: { id: 1, name: "John Doe" },
    isAuthenticated: true,
  };

  return (
    <ThemeProvider value={theme}>
      <AuthProvider value={auth}>
        <ThemedComponent />
      </AuthProvider>
    </ThemeProvider>
  );
});

const ThemedComponent = createComponent(() => {
  const theme = useTheme();
  const auth = useAuth();

  return (
    <div
      style={{
        padding: theme.spacing.large,
        background: theme.colors.primary,
        color: "white",
      }}
    >
      Welcome, {auth.user?.name}!
    </div>
  );
});
```

### Dependency Injection

Inject services and dependencies:

```jsx
const createServiceProvider = () => {
  const services = {};

  const register = (name, service) => {
    services[name] = service;
  };

  const ServiceProvider = createComponent(({ lens }) => {
    const { children } = lens.props;

    // Make services available to children
    const childrenWithServices = children.map((child) =>
      createComponent(() => child({ services }))
    );

    return childrenWithServices;
  });

  const useService = (name) => {
    if (!services[name]) {
      throw new Error(`Service ${name} not registered`);
    }
    return services[name];
  };

  return { register, ServiceProvider, useService };
};

// Create service provider
const { register, ServiceProvider, useService } = createServiceProvider();

// Register services
register("api", {
  fetchUser: (id) => fetch(`/api/users/${id}`),
  fetchPosts: () => fetch("/api/posts"),
});

register("logger", {
  log: (message) => console.log(`[LOG]: ${message}`),
  error: (message) => console.error(`[ERROR]: ${message}`),
});

register("storage", {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
});

// Use services in components
const UserComponent = createComponent(() => {
  const api = useService("api");
  const logger = useService("logger");
  const user = useRefraction(null);

  useEffect(() => {
    logger.log("Fetching user...");
    api
      .fetchUser(1)
      .then((res) => res.json())
      .then(user.set)
      .catch((error) => logger.error(error.message));
  }, []);

  return <div>{user.value?.name}</div>;
});
```

## Layout Composition

### Layout Components

Create flexible layout systems:

```jsx
const Layout = createComponent(({ lens }) => {
  const {
    header,
    sidebar,
    content,
    footer,
    sidebarPosition = "left",
    sidebarWidth = "250px",
  } = lens.props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {header && (
        <header
          style={{
            borderBottom: "1px solid #e2e8f0",
            padding: "20px",
            background: "white",
          }}
        >
          {header}
        </header>
      )}

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: sidebarPosition === "right" ? "row-reverse" : "row",
        }}
      >
        {sidebar && (
          <aside
            style={{
              width: sidebarWidth,
              borderRight:
                sidebarPosition === "left" ? "1px solid #e2e8f0" : "none",
              borderLeft:
                sidebarPosition === "right" ? "1px solid #e2e8f0" : "none",
              padding: "20px",
              background: "#f7fafc",
            }}
          >
            {sidebar}
          </aside>
        )}

        <main
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          {content}
        </main>
      </div>

      {footer && (
        <footer
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "20px",
            background: "#f7fafc",
          }}
        >
          {footer}
        </footer>
      )}
    </div>
  );
});

// Grid layout component
const Grid = createComponent(({ lens }) => {
  const {
    children,
    columns = 12,
    gap = "20px",
    responsive = true,
  } = lens.props;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: responsive
          ? `repeat(auto-fit, minmax(${100 / columns}%, 1fr))`
          : `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
});

const GridItem = createComponent(({ lens }) => {
  const { children, span = 1, ...props } = lens.props;

  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
```

### Responsive Composition

Build responsive layouts:

```jsx
const useMediaQuery = (query) => {
  const matches = useRefraction(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    matches.set(mediaQuery.matches);

    const handler = (e) => matches.set(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches.value;
};

const ResponsiveLayout = createComponent(({ lens }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { children } = lens.props;

  if (isMobile) {
    return (
      <div style={{ padding: "10px" }}>
        <MobileLayout>{children}</MobileLayout>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div style={{ padding: "20px" }}>
        <TabletLayout>{children}</TabletLayout>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <DesktopLayout>{children}</DesktopLayout>
    </div>
  );
});
```

## Utility Composition

Create reusable utility components:

```jsx
// Conditional rendering utility
const Show = createComponent(({ lens }) => {
  const { when, fallback = null, children } = lens.props;
  return when ? children : fallback;
});

// Loop utility
const For = createComponent(({ lens }) => {
  const { each, children } = lens.props;
  return each.map((item, index) => children(item, index));
});

// Switch/Case utility
const Switch = createComponent(({ lens }) => {
  const { value, children } = lens.props;

  for (const child of children) {
    if (child.type === Case && child.props.value === value) {
      return child.props.children;
    }
    if (child.type === Default) {
      return child.props.children;
    }
  }

  return null;
});

const Case = ({ value, children }) => children;
const Default = ({ children }) => children;

// Usage
const StatusDisplay = createComponent(({ lens }) => {
  const status = lens.props.status;

  return (
    <div>
      <Show when={status.loading} fallback={<span>Ready</span>}>
        <Spinner />
      </Show>

      <For each={status.items}>
        {(item, index) => <div key={index}>{item.name}</div>}
      </For>

      <Switch value={status.type}>
        <Case value="success">
          <div style={{ color: "green" }}>Success!</div>
        </Case>
        <Case value="error">
          <div style={{ color: "red" }}>Error occurred</div>
        </Case>
        <Default>
          <div>Unknown status</div>
        </Default>
      </Switch>
    </div>
  );
});
```

## Error Boundary Pattern

Handle errors gracefully:

```jsx
const ErrorBoundary = createComponent(({ lens }) => {
  const { children, fallback } = lens.props;
  const hasError = lens.useRefraction(false);
  const error = lens.useRefraction(null);

  const resetError = () => {
    hasError.set(false);
    error.set(null);
  };

  // Catch errors in child components
  const renderChildren = () => {
    try {
      return children;
    } catch (err) {
      hasError.set(true);
      error.set(err);
      return null;
    }
  };

  if (hasError.value) {
    if (fallback) {
      return fallback(error.value, resetError);
    }

    return (
      <div
        style={{
          padding: "20px",
          background: "#fed7d7",
          border: "1px solid #fc8181",
          borderRadius: "8px",
        }}
      >
        <h3>Something went wrong</h3>
        <p>{error.value?.message}</p>
        <button onClick={resetError}>Try again</button>
      </div>
    );
  }

  return renderChildren();
});

// Usage
const App = createComponent(() => {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <h2>Oops!</h2>
          <p>{error.message}</p>
          <button onClick={reset}>Reset</button>
        </div>
      )}
    >
      <RiskyComponent />
    </ErrorBoundary>
  );
});
```

## Advanced Patterns

### Portal Pattern

Render outside parent DOM hierarchy:

```jsx
const Portal = createComponent(({ lens }) => {
  const { children, target = document.body } = lens.props;
  const container = lens.useRefraction(null);

  lens.useEffect(() => {
    const el = document.createElement("div");
    target.appendChild(el);
    container.set(el);

    return () => {
      target.removeChild(el);
    };
  }, [target]);

  if (!container.value) return null;

  return ReactDOM.createPortal(children, container.value);
});

// Tooltip using Portal
const Tooltip = createComponent(({ lens }) => {
  const { children, content } = lens.props;
  const isVisible = lens.useRefraction(false);
  const position = lens.useRefraction({ x: 0, y: 0 });
  const triggerRef = lens.useRefraction(null);

  const handleMouseEnter = (e) => {
    const rect = triggerRef.value.getBoundingClientRect();
    position.set({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    isVisible.set(true);
  };

  const handleMouseLeave = () => {
    isVisible.set(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>

      {isVisible.value && (
        <Portal>
          <div
            style={{
              position: "fixed",
              left: position.value.x,
              top: position.value.y,
              transform: "translate(-50%, -100%)",
              background: "#1a202c",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              zIndex: 9999,
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
});
```

### Controller Pattern

Separate logic from presentation:

```jsx
// Controller with business logic
const useFormController = (initialValues, validationRules) => {
  const values = useRefraction(initialValues);
  const errors = useRefraction({});
  const touched = useRefraction({});
  const isSubmitting = useRefraction(false);

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return null;

    if (rule.required && !value) {
      return `${name} is required`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || `Invalid ${name}`;
    }

    if (rule.custom) {
      return rule.custom(value, values.value);
    }

    return null;
  };

  const handleChange = (name, value) => {
    values.set({ ...values.value, [name]: value });

    if (touched.value[name]) {
      const error = validateField(name, value);
      errors.set({ ...errors.value, [name]: error });
    }
  };

  const handleBlur = (name) => {
    touched.set({ ...touched.value, [name]: true });
    const error = validateField(name, values.value[name]);
    errors.set({ ...errors.value, [name]: error });
  };

  const handleSubmit = async (onSubmit) => {
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values.value[name]);
      if (error) {
        newErrors[name] = error;
        hasErrors = true;
      }
    });

    errors.set(newErrors);

    if (!hasErrors) {
      isSubmitting.set(true);
      try {
        await onSubmit(values.value);
      } finally {
        isSubmitting.set(false);
      }
    }
  };

  return {
    values: values.value,
    errors: errors.value,
    touched: touched.value,
    isSubmitting: isSubmitting.value,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

// Presentational component
const Form = createComponent(({ lens }) => {
  const { fields, onSubmit } = lens.props;

  const controller = useFormController(
    Object.fromEntries(fields.map((f) => [f.name, ""])),
    Object.fromEntries(fields.map((f) => [f.name, f.validation]))
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        controller.handleSubmit(onSubmit);
      }}
    >
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "20px" }}>
          <label>{field.label}</label>
          <input
            type={field.type || "text"}
            value={controller.values[field.name]}
            onChange={(e) =>
              controller.handleChange(field.name, e.target.value)
            }
            onBlur={() => controller.handleBlur(field.name)}
            style={{
              width: "100%",
              padding: "10px",
              border: controller.errors[field.name]
                ? "1px solid red"
                : "1px solid #e2e8f0",
            }}
          />
          {controller.errors[field.name] && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {controller.errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={controller.isSubmitting}
        style={{
          padding: "10px 20px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: controller.isSubmitting ? "not-allowed" : "pointer",
          opacity: controller.isSubmitting ? 0.5 : 1,
        }}
      >
        {controller.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
});
```

## Best Practices

### 1. Single Responsibility

```jsx
// ✅ Good - each component has one job
const UserAvatar = ({ user }) => <img src={user.avatar} />;
const UserName = ({ user }) => <span>{user.name}</span>;
const UserBadge = ({ role }) => <span className={`badge-${role}`}>{role}</span>;

// ❌ Bad - doing too much
const UserInfo = ({ user }) => {
  // Handles avatar, name, badge, status, etc.
};
```

### 2. Composition Over Configuration

```jsx
// ✅ Good - compose components
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>

// ❌ Bad - configuration object
<Card config={{
  header: 'Title',
  body: 'Content',
  footer: 'Actions',
  variant: 'large',
  showBorder: true
}} />
```

### 3. Explicit Over Implicit

```jsx
// ✅ Good - explicit composition
<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<Content />}
/>

// ❌ Bad - implicit magic
<Layout>
  {/* Framework magically finds header/sidebar/content */}
</Layout>
```

### 4. Props Spreading Carefully

```jsx
// ✅ Good - controlled spreading
const Button = ({ variant, size, ...htmlProps }) => {
  const className = getClassName(variant, size);
  return <button className={className} {...htmlProps} />;
};

// ❌ Bad - uncontrolled spreading
const Button = (props) => <button {...props} />;
```

### 5. Type Safety

```jsx
// ✅ Good - typed composition
interface CardProps {
  header: ReactNode
  children: ReactNode
  footer?: ReactNode
}

const Card: FC<CardProps> = ({ header, children, footer }) => {
  // Type-safe composition
}
```

---

## Next Steps

Master more Refract patterns:

- [State Management](/docs/state-management)
- [Event Handling](/docs/event-handling)
- [Animations](/docs/animations)
- [Performance](/docs/performance)

---

_Great applications are built through thoughtful composition. Master these patterns to create maintainable, scalable, and elegant user interfaces._

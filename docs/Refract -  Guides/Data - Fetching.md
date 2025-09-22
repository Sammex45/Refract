---
sidebar_position: 4
---

# Data Fetching

Master the art of fetching, caching, and synchronizing data in your Refract applications. From simple API calls to complex real-time systems, learn patterns that make data management elegant and efficient.

## Core Concepts

### Data Fetching Principles

Refract's approach to data fetching is built on:

- **Declarative Loading States**: Clear UI states for every scenario
- **Automatic Caching**: Smart defaults with fine control
- **Optimistic Updates**: Instant UI feedback
- **Real-time Sync**: WebSocket and SSE support
- **Error Recovery**: Graceful handling and retries

### The Refract Way

```jsx
// Data fetching in Refract is simple and powerful
const UserProfile = createComponent(({ lens }) => {
  const user = lens.useRefraction(null);
  const loading = lens.useRefraction(true);
  const error = lens.useRefraction(null);

  lens.useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(user.set)
      .catch(error.set)
      .finally(() => loading.set(false));
  }, []);

  if (loading.value) return <LoadingSpinner />;
  if (error.value) return <ErrorMessage error={error.value} />;

  return <Profile user={user.value} />;
});
```

## Basic Data Fetching

### Simple Fetch Pattern

Create a reusable data fetching hook:

```jsx
const useFetch = (url, options = {}) => {
  const data = useRefraction(null);
  const loading = useRefraction(true);
  const error = useRefraction(null);

  const refetch = async () => {
    loading.set(true);
    error.set(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      data.set(json);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [url]);

  return {
    data: data.value,
    loading: loading.value,
    error: error.value,
    refetch,
  };
};

// Usage
const UserList = createComponent(({ lens }) => {
  const { data: users, loading, error, refetch } = useFetch("/api/users");

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
});
```

### Advanced Fetch Hook

Add more features to the fetch hook:

```jsx
const useAdvancedFetch = (url, options = {}) => {
  const data = useRefraction(null);
  const loading = useRefraction(false);
  const error = useRefraction(null);
  const abortController = useRefraction(null);

  const execute = async (overrideOptions = {}) => {
    // Cancel any ongoing request
    if (abortController.value) {
      abortController.value.abort();
    }

    const controller = new AbortController();
    abortController.set(controller);

    loading.set(true);
    error.set(null);

    try {
      const response = await fetch(url, {
        ...options,
        ...overrideOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      data.set(result);
      return result;
    } catch (err) {
      if (err.name !== "AbortError") {
        error.set(err);
        throw err;
      }
    } finally {
      loading.set(false);
      abortController.set(null);
    }
  };

  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort();
      abortController.set(null);
    }
  };

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }

    return () => cancel();
  }, [url]);

  return {
    data: data.value,
    loading: loading.value,
    error: error.value,
    execute,
    cancel,
  };
};
```

### POST Requests and Mutations

Handle data mutations effectively:

```jsx
const useMutation = (url, options = {}) => {
  const data = useRefraction(null);
  const loading = useRefraction(false);
  const error = useRefraction(null);

  const mutate = async (payload) => {
    loading.set(true);
    error.set(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(payload),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json();
      data.set(result);

      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (err) {
      error.set(err);

      // Call error callback if provided
      if (options.onError) {
        options.onError(err);
      }

      throw err;
    } finally {
      loading.set(false);
    }
  };

  return {
    mutate,
    data: data.value,
    loading: loading.value,
    error: error.value,
  };
};

// Usage
const CreatePost = createComponent(({ lens }) => {
  const title = lens.useRefraction("");
  const content = lens.useRefraction("");

  const { mutate: createPost, loading } = useMutation("/api/posts", {
    onSuccess: (post) => {
      console.log("Post created:", post);
      // Navigate to post or show success message
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      title: title.value,
      content: content.value,
    });
    // Clear form
    title.set("");
    content.set("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title.value}
        onChange={(e) => title.set(e.target.value)}
        placeholder="Title"
        disabled={loading}
      />
      <textarea
        value={content.value}
        onChange={(e) => content.set(e.target.value)}
        placeholder="Content"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
});
```

## Caching Strategies

### Simple Cache Implementation

Build a basic caching system:

```jsx
const createCache = () => {
  const cache = new Map();

  return {
    get: (key) => {
      const entry = cache.get(key);
      if (!entry) return null;

      // Check if cache expired
      if (entry.expiry && Date.now() > entry.expiry) {
        cache.delete(key);
        return null;
      }

      return entry.data;
    },

    set: (key, data, ttl = 5 * 60 * 1000) => {
      cache.set(key, {
        data,
        expiry: ttl ? Date.now() + ttl : null,
        timestamp: Date.now(),
      });
    },

    delete: (key) => cache.delete(key),
    clear: () => cache.clear(),
    has: (key) => cache.has(key),
  };
};

// Create global cache instance
const apiCache = createCache();

// Fetch with cache
const useCachedFetch = (url, options = {}) => {
  const data = useRefraction(null);
  const loading = useRefraction(true);
  const error = useRefraction(null);
  const cacheKey = `${url}-${JSON.stringify(options)}`;

  const fetchData = async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh) {
      const cached = apiCache.get(cacheKey);
      if (cached) {
        data.set(cached);
        loading.set(false);
        return cached;
      }
    }

    loading.set(true);
    error.set(null);

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      // Cache the result
      apiCache.set(cacheKey, result, options.cacheTTL);
      data.set(result);

      return result;
    } catch (err) {
      error.set(err);
      throw err;
    } finally {
      loading.set(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data: data.value,
    loading: loading.value,
    error: error.value,
    refetch: () => fetchData(true),
    refresh: () => fetchData(false),
  };
};
```

### Advanced Cache with Stale-While-Revalidate

Implement SWR pattern:

```jsx
const useSWR = (key, fetcher, options = {}) => {
  const data = useRefraction(null);
  const error = useRefraction(null);
  const isValidating = useRefraction(false);
  const cache = globalRefraction(new Map());

  const {
    refreshInterval = null,
    dedupingInterval = 2000,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
  } = options;

  const fetchData = async () => {
    isValidating.set(true);

    try {
      const result = await fetcher(key);
      cache.value.set(key, {
        data: result,
        timestamp: Date.now(),
      });
      data.set(result);
      error.set(null);
    } catch (err) {
      error.set(err);
    } finally {
      isValidating.set(false);
    }
  };

  const revalidate = async () => {
    const cached = cache.value.get(key);

    // Deduping - don't refetch if recently fetched
    if (cached && Date.now() - cached.timestamp < dedupingInterval) {
      return;
    }

    await fetchData();
  };

  useEffect(() => {
    // Load from cache first (stale)
    const cached = cache.value.get(key);
    if (cached) {
      data.set(cached.data);
    }

    // Then revalidate
    revalidate();

    // Set up refresh interval
    let interval;
    if (refreshInterval) {
      interval = setInterval(revalidate, refreshInterval);
    }

    // Revalidate on focus
    const handleFocus = () => {
      if (revalidateOnFocus) {
        revalidate();
      }
    };

    // Revalidate on reconnect
    const handleOnline = () => {
      if (revalidateOnReconnect) {
        revalidate();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("online", handleOnline);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("online", handleOnline);
    };
  }, [key]);

  return {
    data: data.value,
    error: error.value,
    isValidating: isValidating.value,
    mutate: (newData) => {
      data.set(newData);
      cache.value.set(key, {
        data: newData,
        timestamp: Date.now(),
      });
    },
    revalidate,
  };
};

// Usage
const Profile = createComponent(({ lens }) => {
  const userId = lens.props.userId;

  const {
    data: user,
    error,
    isValidating,
  } = useSWR(
    `/api/users/${userId}`,
    (url) => fetch(url).then((r) => r.json()),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  if (error) return <div>Error loading user</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      {isValidating && <span>Updating...</span>}
    </div>
  );
});
```

## Pagination

### Basic Pagination

Implement paginated data fetching:

```jsx
const usePagination = (baseUrl, pageSize = 10) => {
  const currentPage = useRefraction(1);
  const totalPages = useRefraction(1);
  const items = useRefraction([]);
  const loading = useRefraction(false);
  const error = useRefraction(null);

  const fetchPage = async (page) => {
    loading.set(true);
    error.set(null);

    try {
      const response = await fetch(`${baseUrl}?page=${page}&limit=${pageSize}`);
      const data = await response.json();

      items.set(data.items);
      totalPages.set(data.totalPages);
      currentPage.set(page);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  };

  useEffect(() => {
    fetchPage(currentPage.value);
  }, []);

  return {
    items: items.value,
    currentPage: currentPage.value,
    totalPages: totalPages.value,
    loading: loading.value,
    error: error.value,

    goToPage: (page) => fetchPage(page),
    nextPage: () => {
      if (currentPage.value < totalPages.value) {
        fetchPage(currentPage.value + 1);
      }
    },
    prevPage: () => {
      if (currentPage.value > 1) {
        fetchPage(currentPage.value - 1);
      }
    },
    refresh: () => fetchPage(currentPage.value),
  };
};

// Pagination component
const PaginatedList = createComponent(({ lens }) => {
  const {
    items,
    currentPage,
    totalPages,
    loading,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination("/api/posts", 20);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={prevPage} disabled={currentPage === 1 || loading}>
          Previous
        </button>

        <div style={{ display: "flex", gap: "5px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              style={{
                background: currentPage === i + 1 ? "#667eea" : "#e2e8f0",
                color: currentPage === i + 1 ? "white" : "black",
              }}
              disabled={loading}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
});
```

### Cursor-Based Pagination

For large datasets:

```jsx
const useCursorPagination = (baseUrl, pageSize = 20) => {
  const items = useRefraction([]);
  const cursor = useRefraction(null);
  const hasMore = useRefraction(true);
  const loading = useRefraction(false);
  const error = useRefraction(null);

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return;

    loading.set(true);
    error.set(null);

    try {
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        ...(cursor.value && { cursor: cursor.value }),
      });

      const response = await fetch(`${baseUrl}?${params}`);
      const data = await response.json();

      items.set([...items.value, ...data.items]);
      cursor.set(data.nextCursor);
      hasMore.set(data.hasMore);
    } catch (err) {
      error.set(err);
    } finally {
      loading.set(false);
    }
  };

  const reset = () => {
    items.set([]);
    cursor.set(null);
    hasMore.set(true);
    loadMore();
  };

  useEffect(() => {
    loadMore();
  }, []);

  return {
    items: items.value,
    loading: loading.value,
    error: error.value,
    hasMore: hasMore.value,
    loadMore,
    reset,
  };
};
```

## Infinite Scrolling

### Intersection Observer Pattern

Implement infinite scroll with Intersection Observer:

```jsx
const useInfiniteScroll = (fetcher, options = {}) => {
  const { threshold = 0.1, rootMargin = "100px" } = options;

  const items = useRefraction([]);
  const page = useRefraction(1);
  const loading = useRefraction(false);
  const hasMore = useRefraction(true);
  const observerTarget = useRefraction(null);

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return;

    loading.set(true);

    try {
      const newItems = await fetcher(page.value);

      if (newItems.length === 0) {
        hasMore.set(false);
      } else {
        items.set([...items.value, ...newItems]);
        page.set(page.value + 1);
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      loading.set(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold, rootMargin }
    );

    if (observerTarget.value) {
      observer.observe(observerTarget.value);
    }

    return () => {
      if (observerTarget.value) {
        observer.unobserve(observerTarget.value);
      }
    };
  }, [observerTarget.value, hasMore.value]);

  return {
    items: items.value,
    loading: loading.value,
    hasMore: hasMore.value,
    observerTarget: (element) => observerTarget.set(element),
    refresh: () => {
      items.set([]);
      page.set(1);
      hasMore.set(true);
      loadMore();
    },
  };
};

// Usage
const InfiniteList = createComponent(({ lens }) => {
  const fetcher = async (page) => {
    const response = await fetch(`/api/items?page=${page}`);
    return response.json();
  };

  const { items, loading, hasMore, observerTarget } =
    useInfiniteScroll(fetcher);

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "20px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

      {hasMore && (
        <div
          ref={observerTarget}
          style={{
            padding: "20px",
            textAlign: "center",
          }}
        >
          {loading ? "Loading more..." : "Scroll for more"}
        </div>
      )}

      {!hasMore && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          No more items to load
        </div>
      )}
    </div>
  );
});
```

### Virtual Infinite Scroll

For extremely large lists:

```jsx
const useVirtualInfiniteScroll = (fetcher, itemHeight = 50) => {
  const items = useRefraction([]);
  const scrollTop = useRefraction(0);
  const containerHeight = useRefraction(500);
  const loading = useRefraction(false);
  const hasMore = useRefraction(true);

  const visibleRange = {
    start: Math.floor(scrollTop.value / itemHeight),
    end: Math.ceil((scrollTop.value + containerHeight.value) / itemHeight),
  };

  const visibleItems = items.value.slice(visibleRange.start, visibleRange.end);

  const totalHeight = items.value.length * itemHeight;

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return;

    loading.set(true);
    const newItems = await fetcher(items.value.length);

    if (newItems.length === 0) {
      hasMore.set(false);
    } else {
      items.set([...items.value, ...newItems]);
    }

    loading.set(false);
  };

  const handleScroll = (e) => {
    const { scrollTop: st, clientHeight } = e.target;
    scrollTop.set(st);

    // Load more when near bottom
    if (st + clientHeight >= totalHeight - 200) {
      loadMore();
    }
  };

  return {
    visibleItems,
    totalHeight,
    handleScroll,
    visibleRange,
    loading: loading.value,
    hasMore: hasMore.value,
  };
};
```

## Real-Time Data

### WebSocket Integration

Connect to real-time data streams:

```jsx
const useWebSocket = (url, options = {}) => {
  const socket = useRefraction(null);
  const connected = useRefraction(false);
  const messages = useRefraction([]);
  const error = useRefraction(null);

  const connect = () => {
    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        connected.set(true);
        error.set(null);

        if (options.onOpen) {
          options.onOpen();
        }
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        messages.set([...messages.value, message]);

        if (options.onMessage) {
          options.onMessage(message);
        }
      };

      ws.onerror = (err) => {
        error.set(err);

        if (options.onError) {
          options.onError(err);
        }
      };

      ws.onclose = () => {
        connected.set(false);

        if (options.onClose) {
          options.onClose();
        }

        // Auto-reconnect
        if (options.reconnect) {
          setTimeout(connect, options.reconnectInterval || 5000);
        }
      };

      socket.set(ws);
    } catch (err) {
      error.set(err);
    }
  };

  const send = (data) => {
    if (socket.value && connected.value) {
      socket.value.send(JSON.stringify(data));
    }
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.close();
      socket.set(null);
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [url]);

  return {
    connected: connected.value,
    messages: messages.value,
    error: error.value,
    send,
    disconnect,
    reconnect: connect,
  };
};

// Chat component using WebSocket
const Chat = createComponent(({ lens }) => {
  const messageText = lens.useRefraction("");

  const { connected, messages, send } = useWebSocket("wss://chat.example.com", {
    reconnect: true,
    onMessage: (msg) => {
      console.log("New message:", msg);
    },
  });

  const sendMessage = () => {
    if (messageText.value.trim()) {
      send({
        type: "message",
        text: messageText.value,
        timestamp: Date.now(),
      });
      messageText.set("");
    }
  };

  return (
    <div>
      <div
        style={{
          height: "400px",
          overflow: "auto",
          border: "1px solid #e2e8f0",
          padding: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          value={messageText.value}
          onChange={(e) => messageText.set(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          disabled={!connected}
          style={{ flex: 1, padding: "10px" }}
        />
        <button
          onClick={sendMessage}
          disabled={!connected || !messageText.value.trim()}
        >
          Send
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        Status: {connected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
});
```

### Server-Sent Events (SSE)

For one-way real-time data:

```jsx
const useSSE = (url, options = {}) => {
  const events = useRefraction([]);
  const connected = useRefraction(false);
  const error = useRefraction(null);
  const eventSource = useRefraction(null);

  const connect = () => {
    const source = new EventSource(url);

    source.onopen = () => {
      connected.set(true);
      error.set(null);
    };

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      events.set([...events.value, data]);

      if (options.onMessage) {
        options.onMessage(data);
      }
    };

    source.onerror = (err) => {
      error.set(err);
      connected.set(false);

      if (options.onError) {
        options.onError(err);
      }
    };

    // Custom event listeners
    if (options.events) {
      Object.entries(options.events).forEach(([event, handler]) => {
        source.addEventListener(event, handler);
      });
    }

    eventSource.set(source);
  };

  const disconnect = () => {
    if (eventSource.value) {
      eventSource.value.close();
      eventSource.set(null);
      connected.set(false);
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [url]);

  return {
    events: events.value,
    connected: connected.value,
    error: error.value,
    reconnect: () => {
      disconnect();
      connect();
    },
  };
};

// Live notifications
const Notifications = createComponent(({ lens }) => {
  const { events: notifications } = useSSE("/api/notifications", {
    events: {
      "user-joined": (e) => console.log("User joined:", e.data),
      "user-left": (e) => console.log("User left:", e.data),
    },
  });

  return (
    <div>
      <h3>Live Notifications</h3>
      {notifications.map((notif, i) => (
        <div
          key={i}
          animate={{
            opacity: [0, 1],
            x: [-20, 0],
            transition: { duration: 0.3 },
          }}
          style={{
            padding: "10px",
            background: "#f7fafc",
            marginBottom: "5px",
            borderRadius: "6px",
          }}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
});
```

## Optimistic Updates

### Optimistic UI Pattern

Update UI immediately, sync with server:

```jsx
const useOptimisticUpdate = (url, options = {}) => {
  const data = useRefraction([]);
  const pending = useRefraction([]);
  const errors = useRefraction({});

  const optimisticUpdate = async (operation, optimisticData, request) => {
    const tempId = `temp_${Date.now()}`;

    // Apply optimistic update immediately
    if (operation === "create") {
      const newItem = { ...optimisticData, id: tempId, _pending: true };
      data.set([...data.value, newItem]);
      pending.set([...pending.value, tempId]);
    } else if (operation === "update") {
      data.set(
        data.value.map((item) =>
          item.id === optimisticData.id
            ? { ...item, ...optimisticData, _pending: true }
            : item
        )
      );
      pending.set([...pending.value, optimisticData.id]);
    } else if (operation === "delete") {
      data.set(
        data.value.map((item) =>
          item.id === optimisticData.id
            ? { ...item, _deleted: true, _pending: true }
            : item
        )
      );
      pending.set([...pending.value, optimisticData.id]);
    }

    try {
      // Send request to server
      const response = await request();

      // Update with server response
      if (operation === "create") {
        data.set(
          data.value.map((item) =>
            item.id === tempId ? { ...response, _pending: false } : item
          )
        );
      } else if (operation === "update") {
        data.set(
          data.value.map((item) =>
            item.id === optimisticData.id
              ? { ...response, _pending: false }
              : item
          )
        );
      } else if (operation === "delete") {
        data.set(data.value.filter((item) => item.id !== optimisticData.id));
      }

      // Remove from pending
      pending.set(
        pending.value.filter((id) => id !== tempId && id !== optimisticData.id)
      );

      // Clear any errors for this item
      const newErrors = { ...errors.value };
      delete newErrors[tempId];
      delete newErrors[optimisticData.id];
      errors.set(newErrors);

      return response;
    } catch (error) {
      // Revert optimistic update on error
      if (operation === "create") {
        data.set(data.value.filter((item) => item.id !== tempId));
      } else if (operation === "update" || operation === "delete") {
        // Refetch to get correct state
        await refetch();
      }

      // Store error
      errors.set({
        ...errors.value,
        [operation === "create" ? tempId : optimisticData.id]: error,
      });

      // Remove from pending
      pending.set(
        pending.value.filter((id) => id !== tempId && id !== optimisticData.id)
      );

      throw error;
    }
  };

  const refetch = async () => {
    const response = await fetch(url);
    const result = await response.json();
    data.set(result);
  };

  useEffect(() => {
    refetch();
  }, [url]);

  return {
    data: data.value,
    pending: pending.value,
    errors: errors.value,
    optimisticUpdate,
    refetch,
  };
};

// Todo list with optimistic updates
const TodoList = createComponent(({ lens }) => {
  const newTodoText = lens.useRefraction("");

  const {
    data: todos,
    pending,
    errors,
    optimisticUpdate,
  } = useOptimisticUpdate("/api/todos");

  const addTodo = async () => {
    const text = newTodoText.value;
    newTodoText.set("");

    await optimisticUpdate("create", { text, completed: false }, () =>
      fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }).then((r) => r.json())
    );
  };

  const toggleTodo = async (todo) => {
    await optimisticUpdate(
      "update",
      { ...todo, completed: !todo.completed },
      () =>
        fetch(`/api/todos/${todo.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !todo.completed }),
        }).then((r) => r.json())
    );
  };

  const deleteTodo = async (todo) => {
    await optimisticUpdate("delete", todo, () =>
      fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      })
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={newTodoText.value}
          onChange={(e) => newTodoText.set(e.target.value)}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              opacity: todo._deleted ? 0.3 : todo._pending ? 0.7 : 1,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
              disabled={pending.includes(todo.id)}
            />
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo)}
              disabled={pending.includes(todo.id)}
            >
              Delete
            </button>
            {errors[todo.id] && (
              <span style={{ color: "red" }}>
                Error: {errors[todo.id].message}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
```

## Search and Filtering

### Debounced Search

Implement efficient search:

```jsx
const useSearch = (searchFn, delay = 300) => {
  const query = useRefraction("");
  const results = useRefraction([]);
  const loading = useRefraction(false);
  const error = useRefraction(null);
  const abortController = useRefraction(null);

  const debouncedSearch = useDebounce(query.value, delay);

  useEffect(() => {
    if (!debouncedSearch) {
      results.set([]);
      return;
    }

    const search = async () => {
      // Cancel previous request
      if (abortController.value) {
        abortController.value.abort();
      }

      const controller = new AbortController();
      abortController.set(controller);

      loading.set(true);
      error.set(null);

      try {
        const searchResults = await searchFn(debouncedSearch, {
          signal: controller.signal,
        });
        results.set(searchResults);
      } catch (err) {
        if (err.name !== "AbortError") {
          error.set(err);
        }
      } finally {
        loading.set(false);
        abortController.set(null);
      }
    };

    search();
  }, [debouncedSearch]);

  return {
    query: query.value,
    setQuery: query.set,
    results: results.value,
    loading: loading.value,
    error: error.value,
  };
};

// Search interface
const SearchInterface = createComponent(({ lens }) => {
  const searchFn = async (query, { signal }) => {
    const response = await fetch(`/api/search?q=${query}`, { signal });
    return response.json();
  };

  const { query, setQuery, results, loading } = useSearch(searchFn, 500);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      {loading && <div>Searching...</div>}

      {results.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "10px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        >
          {results.map((result) => (
            <li
              key={result.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <strong>{result.title}</strong>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
```

## GraphQL Integration

### GraphQL Client Hook

Work with GraphQL APIs:

```jsx
const useGraphQL = (query, variables = {}) => {
  const data = useRefraction(null);
  const loading = useRefraction(false);
  const error = useRefraction(null);

  const execute = async (overrideVariables = {}) => {
    loading.set(true);
    error.set(null);

    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { ...variables, ...overrideVariables },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      data.set(result.data);
      return result.data;
    } catch (err) {
      error.set(err);
      throw err;
    } finally {
      loading.set(false);
    }
  };

  useEffect(() => {
    execute();
  }, [query, JSON.stringify(variables)]);

  return {
    data: data.value,
    loading: loading.value,
    error: error.value,
    refetch: execute,
  };
};

// GraphQL mutation hook
const useGraphQLMutation = (mutation) => {
  const data = useRefraction(null);
  const loading = useRefraction(false);
  const error = useRefraction(null);

  const mutate = async (variables) => {
    loading.set(true);
    error.set(null);

    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      data.set(result.data);
      return result.data;
    } catch (err) {
      error.set(err);
      throw err;
    } finally {
      loading.set(false);
    }
  };

  return {
    mutate,
    data: data.value,
    loading: loading.value,
    error: error.value,
  };
};

// Usage
const UserProfile = createComponent(({ lens }) => {
  const userId = lens.props.userId;

  const { data, loading, error } = useGraphQL(
    `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
        posts {
          id
          title
        }
      }
    }
  `,
    { id: userId }
  );

  const { mutate: updateUser } = useGraphQLMutation(`
    mutation UpdateUser($id: ID!, $input: UserInput!) {
      updateUser(id: $id, input: $input) {
        id
        name
        email
      }
    }
  `);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{data.user.name}</h2>
      <p>{data.user.email}</p>
      <h3>Posts:</h3>
      <ul>
        {data.user.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
});
```

## Error Handling

### Retry Logic

Implement automatic retry on failure:

```jsx
const useRetry = (fn, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    backoff = 2,
    onRetry = () => {},
  } = options;

  const attempt = useRefraction(0);
  const data = useRefraction(null);
  const loading = useRefraction(false);
  const error = useRefraction(null);

  const execute = async (...args) => {
    loading.set(true);
    error.set(null);
    attempt.set(0);

    const retry = async (retryCount = 0) => {
      try {
        const result = await fn(...args);
        data.set(result);
        return result;
      } catch (err) {
        if (retryCount < maxRetries) {
          const delay = retryDelay * Math.pow(backoff, retryCount);

          onRetry(retryCount + 1, err);
          attempt.set(retryCount + 1);

          await new Promise((resolve) => setTimeout(resolve, delay));
          return retry(retryCount + 1);
        } else {
          error.set(err);
          throw err;
        }
      } finally {
        loading.set(false);
      }
    };

    return retry();
  };

  return {
    execute,
    data: data.value,
    loading: loading.value,
    error: error.value,
    attempt: attempt.value,
  };
};

// Usage with retry
const DataWithRetry = createComponent(({ lens }) => {
  const fetchData = async () => {
    const response = await fetch("/api/unreliable");
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  };

  const { execute, data, loading, error, attempt } = useRetry(fetchData, {
    maxRetries: 3,
    retryDelay: 2000,
    onRetry: (attemptNumber, error) => {
      console.log(`Retry attempt ${attemptNumber}:`, error.message);
    },
  });

  useEffect(() => {
    execute();
  }, []);

  return (
    <div>
      {loading && (
        <div>
          Loading...
          {attempt > 0 && ` (Retry ${attempt}/3)`}
        </div>
      )}
      {error && (
        <div>
          Error after {attempt} retries: {error.message}
          <button onClick={execute}>Try Again</button>
        </div>
      )}
      {data && <div>Data: {JSON.stringify(data)}</div>}
    </div>
  );
});
```

## Best Practices

### 1. Use Loading States

```jsx
// ✅ Good - clear loading states
if (loading) return <Skeleton />;
if (error) return <ErrorMessage />;
return <Content data={data} />;

// ❌ Bad - no loading indication
return <Content data={data || []} />;
```

### 2. Cancel Ongoing Requests

```jsx
// ✅ Good - cleanup and cancellation
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [url]);
```

### 3. Handle Errors Gracefully

```jsx
// ✅ Good - user-friendly error handling
if (error) {
  return (
    <ErrorBoundary
      error={error}
      retry={() => refetch()}
      fallback={<DefaultContent />}
    />
  );
}
```

### 4. Cache Appropriately

```jsx
// ✅ Good - smart caching
const { data } = useSWR(key, fetcher, {
  revalidateOnFocus: false, // For stable data
  refreshInterval: 30000, // For changing data
});
```

### 5. Optimize Network Requests

```jsx
// ✅ Good - batch and debounce
const debouncedSearch = useDebounce(query, 300);
const batchedMutations = useBatch(mutations);
```

---

## Next Steps

Continue learning Refract:

- [State Management](/docs/state-management)
- [Event Handling](/docs/event-handling)
- [Animations](/docs/animations)
- [Performance](/docs/performance)

---

_Efficient data fetching is crucial for modern applications. Master these patterns to build fast, responsive, and reliable user experiences._

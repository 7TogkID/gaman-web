# Session

GamanJS provides a powerful and flexible session management system with multiple storage drivers. Using the `ctx.session` object, you can easily **set**, **get**, **check**, and **delete** session data across different storage backends.

---

## Overview

The `ctx.session` utility is accessible in any handler or middleware and supports asynchronous operations with a clean interface:

```ts
(ctx) => {
  await ctx.session.set("userId", 123);
  const userId = await ctx.session.get("userId");
};
```

---

---

## Installation

you need to install the following packages

```bash
npm install @gaman/session
```

## API Reference

### `ctx.session.set(key, value)`

Stores a value in the session.

- `key` (`string`) – The name of the session key.
- `value` (`string | object | Buffer`) – The session value. Objects will be automatically serialized.

#### Example:

```ts
(ctx) => {
  await ctx.session.set("user", { id: 1, name: "Angga" });
  await ctx.session.set("token", "abc123");
  await ctx.session.set("preferences", { theme: "dark", lang: "en" });
};
```

---

### `ctx.session.get(key)`

Retrieves a value from the session.

Returns the stored value or `null` if the key doesn't exist.

#### Example:

```ts
(ctx) => {
  const user = await ctx.session.get("user");
  const token = await ctx.session.get("token");

  if (user) {
    // user data exists
    console.log(user.name);
  }
};
```

---

### `ctx.session.has(key)`

Checks if a session key exists.

Returns `true` if the key exists, `false` otherwise.

#### Example:

```ts
(ctx) => {
  if (await ctx.session.has("user")) {
    // user session exists
  }
};
```

---

### `ctx.session.delete(key)`

Deletes a session key and its value.

#### Example:

```ts
(ctx) => {
  await ctx.session.delete("token");
  await ctx.session.delete("user");
};
```

---

## Integration Setup

To use sessions in your GamanJS application, you need to import and configure the session integration:

```ts
import { session } from "gaman/session";

gaman.serve({
  integrations: [session()],
});
```

---

## Storage Drivers

GamanJS supports multiple session storage drivers. Each driver has its own configuration options and use cases.

### Cookies Driver (Default)

Stores session data in encrypted cookies. Perfect for stateless applications.

```ts
gaman.serve({
  integrations: [
    session({
      driver: { type: "cookies" },
      secret: "your-secret-key",
      maxAge: 86400, // 1 day
      secure: true,
    }),
  ],
});
```

**Use cases:** Small session data, stateless deployments, simple applications.

---

### Memory Driver

Stores session data in server memory. Fast but not persistent across restarts.

```ts
gaman.serve({
  integrations: [
    session({
      driver: { type: "memory" },
      secret: "your-secret-key",
      maxAge: 3600, // 1 hour
    }),
  ],
});
```

**Use cases:** Development, testing, single-server deployments with temporary sessions.

---

### File Driver

Stores session data in local files. Persistent across restarts but not suitable for multi-server setups.

```ts
gaman.serve({
  integrations: [
    session({
      driver: {
        type: "file",
        dir: "./sessions", // Optional: custom directory
      },
      secret: "your-secret-key",
      maxAge: 86400,
    }),
  ],
});
```

**Use cases:** Single-server deployments, development with persistent sessions.

---

### Redis Driver

Stores session data in Redis. Excellent for production and multi-server deployments.

**Installation required:**

```bash
npm install redis
```

```ts
gaman.serve({
  integrations: [
    session({
      driver: {
        type: "redis",
        url: "redis://localhost:6379", // Optional: custom Redis URL
      },
      secret: "your-secret-key",
      maxAge: 86400,
    }),
  ],
});
```

**Use cases:** Production applications, multi-server setups, high-performance requirements.

---

### SQL Driver (SQLite)

Stores session data in SQLite database. Persistent and suitable for single-server deployments.

**Installation required:**

```bash
npm install sqlite3 sqlite
```

```ts
gaman.serve({
  integrations: [
    session({
      driver: {
        type: "sql",
        file: "sessions.db", // Optional: custom database file
      },
      secret: "your-secret-key",
      maxAge: 86400,
    }),
  ],
});
```

**Use cases:** Single-server deployments with persistent sessions, applications requiring SQL queries.

---

### MongoDB Driver

Stores session data in MongoDB. Great for applications already using MongoDB.

**Installation required:**

```bash
npm install mongodb
```

```ts
gaman.serve({
  integrations: [
    session({
      driver: {
        type: "mongodb",
        dbName: "myapp",
        uri: "mongodb://localhost:27017", // Optional: custom MongoDB URI
        collection: "sessions", // Optional: custom collection name
      },
      secret: "your-secret-key",
      maxAge: 86400,
    }),
  ],
});
```

**Use cases:** Applications using MongoDB, document-based session storage, multi-server deployments.

---

## Configuration Options

| Option   | Type    | Description                       | Default                 |
| -------- | ------- | --------------------------------- | ----------------------- |
| `secret` | string  | Secret key for session encryption | `process.env.GAMAN_KEY` |
| `driver` | object  | Storage driver configuration      | `{ type: 'cookies' }`   |
| `maxAge` | number  | Session lifetime in seconds       | `86400` (1 day)         |
| `secure` | boolean | Require HTTPS for session cookies | `true`                  |

---

## Example Workflow

```ts
export default defineRoutes(() => ({
  "/login": async (ctx) => {
    // Simulate login
    const user = { id: 1, name: "Angga", email: "angga@example.com" };

    await ctx.session.set("user", user);
    await ctx.session.set("isAuthenticated", true);

    return Response.json({ status: "logged in", user });
  },

  "/profile": async (ctx) => {
    if (await ctx.session.has("isAuthenticated")) {
      const user = await ctx.session.get("user");
      return Response.json({ user });
    }

    return Response.json({ error: "Not authenticated" }, { status: 401 });
  },

  "/logout": async (ctx) => {
    await ctx.session.delete("user");
    await ctx.session.delete("isAuthenticated");

    return Response.json({ status: "logged out" });
  },

  "/check": async (ctx) => {
    const hasUser = await ctx.session.has("user");
    const isAuth = await ctx.session.get("isAuthenticated");

    return Response.json({
      hasUser,
      isAuthenticated: !!isAuth,
    });
  },
}));
```

---

## Best Practices

- Always use a strong `secret` key in production environments.
- Choose the appropriate driver based on your deployment architecture.
- Use `secure: true` in production (HTTPS required).
- Set reasonable `maxAge` values to balance security and user experience.
- Handle session operations with try-catch blocks for error handling.
- Clean up unused session keys to prevent memory/storage bloat.

---

## Driver Selection Guide

- **Cookies**: Small data, stateless apps, simple deployments
- **Memory**: Development, testing, single-server with temporary sessions
- **File**: Single-server with persistent sessions, development
- **Redis**: Production, multi-server, high performance
- **SQL**: Single-server with SQL needs, persistent sessions
- **MongoDB**: Document-based storage, existing MongoDB infrastructure

---

For advanced usage, sessions integrate seamlessly with authentication middleware and can be extended with custom serialization logic.

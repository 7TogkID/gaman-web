# Tree Routing 

The GamanJS routing system is designed to be flexible and intuitive, using a tree-like structure to represent routes.

## Overview

The GamanJS routing system follows a **Tree Routing** pattern, allowing developers to structure routes hierarchically and modularly. This results in maintainable and scalable backend applications.

---

## Tree Routes Definition

To improve maintainability, you can separate routing logic using `defineTree`. This creates modular route trees.

### Example: Tree Routes Definition

```ts
// userDetail.tree.ts
import { defineTree, Response } from "gaman";

export default defineTree({
  "/detail": {
    GET: (ctx) => {
      return Response.json({ message: "Detail Get User" });
    },
    "/super-detail": {
      GET: (ctx) => {
        return Response.json({ message: "Super-Detail Get User" });
      },
    },
  },
});
```

### Usage

```ts
import userTree from "./userDetail.tree";

export default defineBlock({
  routes: {
    "/getUser/*": (ctx) => {},
    "/getUser": userTree, // OR
    ...userTree, // OR
    "/tree": userTree,
  },
});
```

---

## Tree Router

`defineTree` can also define route handlers that require a **base path**.

### Example

```ts
// docsRouter.tree.ts
import { defineTree, Response } from "gaman";

export default defineTree({
  GET: () => Response.json({ message: "Docs Root" }),
  POST: () => Response.json({ message: "Posted" }),
});
```

### Usage:

(must be attached to a path):

```ts
routes: {
  "/docs": docsRouterTree
}
```

---

## Tree Handler

Single route handler with full context:

### Example

```ts
// handler.tree.ts
import { defineTree, Response } from "gaman";

export default defineTree((ctx) => {
  return Response.json({ message: "Hello from Tree Handler" });
});
```

### Usage:

```ts
routes: {
  "/docs": handlerTree
}
```

---

## Tree Handlers (Array-Based Middleware Stack)

Define a series of middleware-like functions:

### Example

```ts
// handlers.tree.ts
import { defineTree, Response, next } from "gaman";

export default defineTree([
  () => next(),
  (ctx) => next(),
  () => Response.json({ message: "Final handler" }),
]);
```

### Usage:

```ts
routes: {
  "/docs": handlersTree
}
```

---

## Best Practices

- Use `defineTree` to break down complex routing logic.
- Keep each route tree feature-specific (e.g., `user.tree.ts`, `admin.tree.ts`).
- Always assign a path when using tree routers or handlers.
- Prefer arrays for middlewares to ensure ordered execution.

---

## Summary of Route Types

| Type              | Description                              | Usage Requirement        |
| ----------------- | ---------------------------------------- | ------------------------ |
| `Tree Definition` | Object-based `defineTree()`              | Used at any path         |
| `Tree Router`     | Method-mapped object (GET, POST, etc.)   | Requires path assignment |
| `Tree Handler`    | Single function `defineTree(ctx => …)`   | Requires path assignment |
| `Tree Handlers`   | Array of handlers with `next()` chaining | Requires path assignment |

For deeper control and expressiveness, GamanJS’s tree-based routing offers composability and power — perfect for both small and large-scale applications.
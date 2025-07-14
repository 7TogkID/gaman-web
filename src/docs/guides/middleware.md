# Middleware

Middleware in GamanJS provides a powerful way to process requests before they reach the route handler.

## Overview

Middleware in GamanJS provides a powerful way to process requests before they reach the route handler. Middleware can be defined globally for all routes in a Block or scoped to specific paths and HTTP methods. Middleware functions are designed to continue to the next handler when they do not return a response.

---

## Defining Middleware

### Global Middleware

Global middleware is defined using the `all` property in a Block. It applies to all routes within the Block's path.

#### Example:

```ts
import { defineBlock, Response, Logger, next } from "gaman";

export default defineBlock({
  path: "/user",
  all: (ctx) => {
    Logger.log("Global middleware triggered");
    return next();
  },
  routes: {
    "/info": (ctx) => {
      Response.json({ message: "User Info" });
    },
  },
});
```

---

### Scoped Middleware

Scoped middleware is defined within the `routes` object. It applies to specific paths and can target all methods or specific HTTP methods.

#### Path Middleware

Middleware targeting a specific path is defined using `"/*"` at the end of the path.

```ts
routes: {
  "/user/*": (ctx) => {
    Logger.log("Middleware for all /user/* routes");
  },
};
```

#### Method-Specific Middleware

Middleware can also be scoped to specific HTTP methods within a path.

```ts
routes: {
  "/user/*": {
    POST: (ctx) => {
      Logger.log("Middleware for POST requests to /user/*");
    },
  },
};
```

---

### Using the `includes` Property

Middleware can also be included directly using the `includes` property. This allows adding multiple middleware functions in a concise way.

#### Example with Predefined Middleware

```ts
import { defineBlock, Response } from "gaman";
import { cors } from "@gaman/cors";

export default defineBlock({
  path: "/api",
  includes: [
    cors({
      origin: "*",
    }),
  ],
  routes: {
    "/data": (ctx) => {
      return Response.json({ message: "API Data" });
    },
  },
});
```

#### Example with Custom Middleware

Create a custom middleware:

```ts
// user.middleware.ts
import { defineMiddleware, next, Logger } from "gaman";

export default defineMiddleware((ctx) => {
  Logger.log("Custom middleware executed");
  return next();
});
```

Use the custom middleware:

```ts
import { Response } from "gaman";
import userMiddleware from "./user.middleware";

export default defineBlock({
  path: "/user",
  includes: [userMiddleware()],
  routes: {
    "/profile": (ctx) => {
      return Response.json({ message: "User Profile" });
    },
  },
});
```

---

## Behavior of Middleware

1. **No Return Behavior**: Middleware that does not return a response (or uses `return;`) will allow the request to proceed to the next handler or middleware.

   ```ts
   all: (ctx) => {
     Logger.log("Global middleware executed");
     return; // Explicitly allow continuation
   },
   ```

2. **Short-Circuiting**: Middleware can terminate the request-response cycle by returning a response.

   ```ts
   "/user/*": {
     GET: (ctx) => {
       return Response.json({ message: "Access Denied" }, { status: 403 });
     },
   },
   ```

---

## Example

### Block with Middleware

```ts
import { defineBlock, Logger, Response } from "gaman";
import userMiddleware from "./user.middleware";
import { cors } from "@gaman/cors";

export default defineBlock({
  path: "/api",
  includes: [
    cors({
      origin: "*",
    }),
    userMiddleware(),
  ],
  routes: {
    "/user/*": {
      POST: (ctx) => {
        Logger.log("POST middleware for /user/*");
      },
      GET: (ctx) => {
        Logger.log("GET middleware for /user/*");
      },
    },
    "/user": {
      GET: (ctx) => {
        return Response.json({ message: "User Data" });
      },
    },
  },
});
```

### Request Flow

1. A request to `POST /api/user/123` will:
   - Trigger the middleware in `includes` (e.g., `cors` and `userMiddleware`).
   - Trigger the `POST` middleware for `/user/*`.
   - Proceed to the route handler if no response is returned by the middleware.

2. A request to `GET /api/user` will:
   - Trigger the middleware in `includes` (e.g., `cors` and `userMiddleware`).
   - Skip the `/user/*` middleware since the path does not match.
   - Execute the `GET` handler for `/user`.

---

## Best Practices

- **Keep Middleware Lightweight**: Avoid complex logic that might delay the request processing.
- **Organize Middleware**: Use meaningful path names and group related middleware into Blocks.
- **Terminate or Continue Clearly**: Explicitly `return;` to make continuation clear and intentional.

---

## Additional Notes

- Middleware runs sequentially, and order matters.
- The `includes` property provides flexibility for global middleware.
- Path-based middleware now supports patterns like `"/*"`, `"*"`, `"*/user"`, or `"/user/*"`.
- Ensure that middleware does not inadvertently block further processing unless intended.

For more advanced examples, refer to the GamanJS documentation or use cases.

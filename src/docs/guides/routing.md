# Routing

The GamanJS routing system is designed to be flexible and intuitive, using a tree-like structure to represent routes.

## Overview

The routing system allows developers to define routes modularly and clearly using a nested object structure. This promotes a clean and maintainable backend architecture.

---

## Defining Routes

Routes are specified inside the `routes` property of a Block and support multiple HTTP methods and route-level middleware.

### Example: Route Definition

```ts
import { defineBlock, Response } from "gaman";

export default defineBlock({
  routes: {
    "/getUser/*": (ctx) => {
      // Middleware for all routes under /getUser/*
    },
    "/getUser": {
      ALL: (ctx) => {
        return Response.json({ message: "OK!" });
      },
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
    },
  },
});
```

### Supported Methods

* `ALL`: Middleware or handler for all HTTP methods.
* HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, etc.

---

## Best Practices

* Organize routes by feature for clarity.
* Use nested route structures for better grouping.
* Apply wildcard middleware (`/route/*`) for reusable logic.

---

## Additional Notes

* Middleware functions should return `next()` to continue the chain.
* Wildcards (`*`) allow scoped global logic under a route prefix.

For more details, refer to the official GamanJS documentation or real-world examples.

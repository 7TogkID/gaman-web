# Block Modular

Blocks are designed to simplify the development process by consolidating routing.

## Overview

A **Block** in GamanJS is a modular unit that encapsulates all the functionalities associated with a specific route or domain. Blocks are designed to simplify the development process by consolidating routing, middleware, and integrations into a single file.

### Key Features

- **Path-Centric**: All functionalities within a Block are scoped to a defined default path.
- **Domain-Specific**: Routes can be associated with a specific domain for clarity and separation.
- **Middleware Support**: Blocks support middlewares for both global and path-specific requests.
- **Error Handling**: Centralized error handling within the Block.
- **Priority-Based Execution**: Blocks can be prioritized for execution order.
- **NotFound Handlers**: Specific handlers for undefined routes within a block.

---

## Creating a Block

### Step 1: Define a Block

Create a `.block.ts` file (e.g., `user.block.ts`) and define your Block using the `defineBlock` function.

```ts
import { defineBlock } from "gaman";

export default defineBlock({
  path: "/user", // Default path for this Block
  domain: "apiUser.gaman.com", // Associated domain
  priority: "high", // Execution priority for this Block
  includes: [
    (ctx) => {
      console.log("Global middleware for the /user block");
    },
  ],
  all: (ctx) => {
    // Middleware for all routes under /user/*
    // Use `return;` or no return to allow the next handler to execute
  },
  routes: {
    "/getUser/*": (ctx) => {
      // Middleware specific to /getUser/*
    },
    "/getUser": (ctx) => {
      return Response.json({ message: "OK!" });
    },
  },
  notFound: (ctx) => {
    return Response.json({ error: "Route not found" }, { status: 404 });
  },
  error: (error) => {
    // Error handler for the Block
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  },
});
```

### Properties of `defineBlock`

- **`path` (string)**: Specifies the default path for all routes in this Block.
- **`domain` (string)**: Associates a domain with this Block. This domain is prefixed to all routes automatically.
- **`priority` (string)**: Determines the execution order of the Block. Valid values: `"very-high"`, `"high"`, `"normal"`, `"low"`, `"very-low"`. Default is `"normal"`.
- **`includes` (array)**: Array of global middlewares applied to all routes within this Block.
- **`all` (function)**: Middleware executed for all routes within this Block's scope.
- **`routes` (object)**: Defines the individual routes within this Block. Routes can have their own middlewares and handlers.
- **`notFound` (function)**: Handler for HTTP requests that do not match any defined route in the Block.
- **`error` (function)**: Handles errors that occur within the Block.

---

## Integrating Blocks

### Step 2: Register Blocks

To use a Block, import it and include it in the `blocks` array in your `main.ts` file.

```ts
import userBlock from "./user.block";
import gaman from "gaman";

gaman.serv({
  blocks: [userBlock], // List of Blocks to be used
  server: {
    port: 3431, // Optional: Specify server port
    host: "0.0.0.0", // Optional: Specify server host
  },
});
```

---

## Example Workflow

### 1. Create the Block

```ts
import { defineBlock } from "gaman";

export default defineBlock({
  path: "/profile",
  domain: "apiProfile.gaman.com",
  priority: "very-high",
  includes: [
    (ctx) => {
      console.log("Middleware for /profile block");
    },
  ],
  all: (ctx) => {
    console.log("Global Middleware for /profile/* routes");
  },
  routes: {
    "/details": (ctx) => {
      return Response.json({ name: "John Doe", age: 30 });
    },
  },
  notFound: (ctx) => {
    return Response.json({ error: "Profile route not found" }, { status: 404 });
  },
  error: (error) => {
    console.error("Error occurred:", error);
    return Response.json({ message: "Profile error" }, { status: 500 });
  },
});
```

### 2. Register the Block

```ts
import profileBlock from "./profile.block";
import gaman from "gaman";

gaman.serv({
  blocks: [profileBlock],
  server: {
    port: 8080,
    host: "127.0.0.1",
  },
});
```

### 3. Access the API

- **Global Middleware**: Logs requests for any `/profile/*` route.
- **Specific Route**: Access `http://apiProfile.gaman.com/details` to get profile details.
- **NotFound Handler**: Access an undefined route, such as `/profile/undefined`, to trigger the `notFound` handler.

---

## Best Practices

- **Organize by Feature**: Create separate Blocks for different features or modules (e.g., `auth.block.ts`, `user.block.ts`).
- **Keep Routes Focused**: Avoid overcrowding a single Block with too many routes.
- **Utilize Domain**: Use the `domain` property to separate API functionalities.
- **Error Handling**: Ensure each Block has a well-defined `error` handler for robustness.
- **Leverage Priorities**: Use the `priority` property to control execution order for Blocks.

---

## Additional Notes

- Blocks are intended to promote modularity and maintainability in your backend applications.
- Use meaningful names and paths to improve clarity when collaborating with others.

For more advanced usage, refer to the GamanJS documentation.

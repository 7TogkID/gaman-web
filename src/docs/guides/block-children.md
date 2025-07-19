# Block Children

Block Children are an advanced feature in GamanJS that allow you to organize routing hierarchically within a parent Block. Using the `childrens` property, you can embed additional sub-Blocks that operate only within the context of the main Block.

## Overview

A Child Block is a regular modular Block defined inside a parent Block using the `childrens` property. This enables deeper and more structured modular architecture, which is useful for breaking down large features into smaller, manageable modules.

### Key Benefits:

- **Modular Hierarchy**: Break down large blocks into well-organized sub-blocks.
- **Reusability**: Child Blocks can be separated into their own files and imported.
- **Scoped Routing**: Children operate only within their parent Block’s scope.
- **Preserved Middleware and Priority**: Children can have their own middleware, error handler, and notFound handler.

---

## Creating a Block with Children

### Step 1: Create a Child Block

```ts
// ./user/settings.block.ts
import { defineBlock } from "gaman";

export default defineBlock({
  path: "/settings",
  routes: {
    "/privacy": (ctx) => {
      return Response.json({ message: "Privacy Settings" });
    },
  },
});
```

### Step 2: Attach It to the Parent Block

```ts
// ./user.block.ts
import { defineBlock } from "gaman";
import settingsBlock from "./settings.block";

export default defineBlock({
  path: "/user",
  routes: {
    "/profile": (ctx) => {
      return Response.json({ name: "Jane Doe" });
    },
  },
  childrens: [settingsBlock],
});
```

### API Access

- `GET /user/profile` → Handled by the parent Block
- `GET /user/settings/privacy` → Handled by the child Block

---

## Child Block Structure

Child Blocks support the same properties as regular Blocks:

- `path`
- `routes`
- `includes`
- `all`
- `error`
- `notFound`
- `priority`

Example:

```ts
export default defineBlock({
  path: "/preferences",
  includes: [(ctx) => console.log("/preferences middleware")],
  routes: {
    "/theme": (ctx) => Response.json({ theme: "dark" }),
  },
  error: (err) => Response.json({ error: err.message }, { status: 500 }),
});
```

---

## Best Practices

- Use `childrens` to modularize your features:
  - `user.block.ts` → `settings.block.ts`, `preferences.block.ts`
  - `admin.block.ts` → `dashboard.block.ts`, `logs.block.ts`

- Keep each child Block in its own file for maintainability.
- Avoid deeply nested structures to keep the routing system easy to understand.
- Use clear path prefixes for each Child Block.

---

## Additional Notes

- Child Blocks are mounted in the order they appear in the `childrens` array.
- `notFound` and `error` handlers remain functional on each Block scope.
- There's no need to redefine the `domain` on children; they inherit the context from the parent.

For further implementation details, refer to the official GamanJS documentation.
